import {
    Directive,
    ElementRef,
    ViewContainerRef,
    NgZone,
    Input,
    OnInit,
    OnDestroy,
    TemplateRef,
    Inject
} from '@angular/core';
import {
    Overlay,
    ScrollDispatcher,
    OverlayRef,
    ScrollStrategy,
    FlexibleConnectedPositionStrategy,
    OriginConnectionPosition,
    OverlayConnectionPosition,
    HorizontalConnectionPos,
    VerticalConnectionPos,
    ConnectedOverlayPositionChange
} from '@angular/cdk/overlay';
import { Platform } from '@angular/cdk/platform';
import { takeUntil, take } from 'rxjs/operators';
import { blTooltipDefaultConfig, BlTooltipConfig, BL_TOOLTIP_DEFAULT_CONFIG_TOKEN, BlTooltipPosition, BlTooltipTrigger } from './tooltip.config';
import { ComponentPortal } from '@angular/cdk/portal';
import { TooltipComponent } from './tooltip.component';
import { fromEvent, Subject } from 'rxjs';
import { FocusMonitor } from '@angular/cdk/a11y';
import { getFlexiblePositions } from '../shared/overlay';

@Directive({
    selector: '[blTooltip],[bl-tooltip]',
    exportAs: 'blTooltip'
})
export class BlTooltipDirective implements OnInit, OnDestroy {

    ngUnsubscribe$: Subject<any> = new Subject<any>(); // 用于取消订阅

    private manualListeners = new Map<string, EventListenerOrEventListenerObject>();

    private options: BlTooltipConfig = blTooltipDefaultConfig;

    private overlayRef: OverlayRef;

    private tooltipInstance: TooltipComponent;

    private portal: ComponentPortal<TooltipComponent>;

    private scrollStrategy: ScrollStrategy;

    private tooltipClass: string | string[];

    content: string | TemplateRef<HTMLElement>;

    panelClassPrefix = 'bl-tooltip';

    @Input('blTooltip')
    set blTooltip(value: string | TemplateRef<HTMLElement>) {
        if (value) {
            this.content = value;
        }
    }

    // tslint:disable-next-line:no-input-rename
    @Input('blTooltipPlacement') placement: BlTooltipPosition = 'top';

    @Input('blTooltipClass')
    set blTooltipClass(value: string | string[]) {
        this.tooltipClass = value;
        if (this.tooltipInstance) {
            this.setTooltipClass(this.tooltipClass);
        }
    }

    // tslint:disable-next-line:no-input-rename
    @Input('blTooltipShowDelay') showDelay = this.options.showDelay;

    // tslint:disable-next-line:no-input-rename
    @Input('blTooltipHideDelay') hideDelay = this.options.hideDelay;

    // tslint:disable-next-line:no-input-rename
    @Input('blTooltipTrigger') trigger: BlTooltipTrigger = this.options.trigger;

    @Input('blTooltipTemplateContext') data: any;

    @Input('blTooltipOffset') tooltipOffset: number;

    @Input('blTooltipPin') tooltipPin: boolean;


    constructor(
        private overlay: Overlay,
        private elementRef: ElementRef<HTMLElement>,
        private scrollDispatcher: ScrollDispatcher,
        private viewContainerRef: ViewContainerRef,
        private ngZone: NgZone,
        private platform: Platform,
        private focusMonitor: FocusMonitor,
        @Inject(BL_TOOLTIP_DEFAULT_CONFIG_TOKEN)
        private blTooltipConfig: BlTooltipConfig
    ) {
        this.tooltipPin = this.blTooltipConfig.tooltipPin;
        this.options = blTooltipDefaultConfig;
        this.scrollStrategy = overlay.scrollStrategies.reposition({
            scrollThrottle: this.blTooltipConfig.scrollThrottleSeconds
        });
    }

    ngOnInit() {
        const element: HTMLElement = this.elementRef.nativeElement; // 绑定该指令的宿主元素
        if (!this.platform.IOS && !this.platform.ANDROID) {
            if (this.trigger === 'hover') {
                let overlayElement: HTMLElement;
                this.manualListeners
                    .set('mouseenter', () => {
                        this.show();
                    })
                    .set('mouseleave', (event: MouseEvent) => {
                        // element which mouse moved to
                        const toElement = event.toElement || event.relatedTarget;
                        if (this.overlayRef && !overlayElement) {
                            overlayElement = this.overlayRef.overlayElement;
                            fromEvent(overlayElement, 'mouseleave')
                                .pipe(takeUntil(this.ngUnsubscribe$))
                                .subscribe(() => {
                                    this.hide();
                                });
                        }
                        // if element which moved to is in overlayElement, don't hide tooltip
                        if (overlayElement && overlayElement.contains) {
                            const toElementIsTooltip = overlayElement.contains(toElement as Element);
                            if (!toElementIsTooltip || !this.tooltipPin) {
                                this.hide();
                            }
                        }
                    });
            } else if (this.trigger === 'focus') {
                this.focusMonitor
                    .monitor(this.elementRef)
                    .pipe(takeUntil(this.ngUnsubscribe$))
                    .subscribe(origin => {
                        // Note that the focus monitor runs outside the Angular zone.
                        if (!origin) {
                            this.ngZone.run(() => this.hide(0));
                        } else if (origin === 'keyboard') {
                            this.ngZone.run(() => this.show());
                        }
                    });
                // this.manualListeners.set('focus', () => this.show());
                // this.manualListeners.set('blur', () => this.hide());
            } else if (this.trigger === 'click') {
                this.manualListeners.set('click', () => this.show());
            } else {
                throw new Error(`${this.trigger} is not support, only support hover | focus | click`);
            }
        } else {
            // Reserve extensions for mobile in the future
            this.manualListeners.set('touchstart', () => this.show());
        }

        this.manualListeners.forEach((listener, event) => element.addEventListener(event, listener));
    }

    private detach() {
        if (this.overlayRef && this.overlayRef.hasAttached()) {
            this.overlayRef.detach();
        }
        this.tooltipInstance = null;
    }

    /** Create the overlay config and position strategy */
    private createOverlay(): OverlayRef {
        if (this.overlayRef) {
            return this.overlayRef;
        }
        const scrollableAncestors = this.scrollDispatcher.getAncestorScrollContainers(this.elementRef);
        // Create connected position strategy that listens for scroll events to reposition.
        const strategy = this.overlay
            .position()
            .flexibleConnectedTo(this.elementRef)
            .withTransformOriginOn('.bl-tooltip-content')
            .withFlexibleDimensions(false)
            .withViewportMargin(8);

        strategy.withScrollableContainers(scrollableAncestors);

        strategy.positionChanges.pipe(takeUntil(this.ngUnsubscribe$)).subscribe(change => {
            if (this.tooltipInstance) {
                if (change.scrollableViewProperties.isOverlayClipped && this.tooltipInstance.isVisible()) {
                    // After position changes occur and the overlay is clipped by
                    // a parent scrollable then close the tooltip.
                    this.ngZone.run(() => this.hide(0));
                }
            }
        });

        this.overlayRef = this.overlay.create({
            positionStrategy: strategy,
            panelClass: this.blTooltipConfig.tooltipPanelClass,
            scrollStrategy: this.scrollStrategy,
            hasBackdrop: this.trigger === 'click',
            backdropClass: 'bl-tooltip-backdrop'
        });

        this.updatePosition();

        this.overlayRef.detachments()
            .pipe(takeUntil(this.ngUnsubscribe$))
            .subscribe(() => this.detach());

        this.overlayRef.backdropClick()
            .pipe(takeUntil(this.ngUnsubscribe$))
            .subscribe(() => {
                this.overlayRef.detachBackdrop();
                this.hide();
            });

        return this.overlayRef;
    }

    private updateTooltipContent() {
        // Must wait for the message to be painted to the tooltip so that the overlay can properly
        // calculate the correct positioning based on the size of the text.
        if (this.tooltipInstance) {
            this.tooltipInstance.content = this.content;
            this.tooltipInstance.data = this.data;
            this.tooltipInstance.markForCheck();
            this.ngZone.onMicrotaskEmpty.asObservable()
                .pipe(
                    take(1),
                    takeUntil(this.ngUnsubscribe$)
                )
                .subscribe(() => {
                    if (this.tooltipInstance) {
                        this.overlayRef.updatePosition();
                    }
                });
        }
    }

    /** Returns true if the tooltip is currently visible to the user */
    private isTooltipVisible(): boolean {
        return !!this.tooltipInstance && this.tooltipInstance.isVisible();
    }

    /** Updates the position of the current tooltip. */
    private updatePosition() {
        const position = this.overlayRef.getConfig().positionStrategy as FlexibleConnectedPositionStrategy;
        const connectionPositions = getFlexiblePositions(
            this.placement,
            this.tooltipOffset || this.blTooltipConfig.offset,
            this.panelClassPrefix
        );
        position.withPositions(connectionPositions);
    }

    private setTooltipClass(tooltipClass: string | string[]) {
        if (this.tooltipInstance) {
            this.tooltipInstance.setTooltipClass(tooltipClass);
        }
    }


    /** Shows the tooltip after the delay in ms, defaults to tooltip-delay-show 200ms */
    show(delay: number = this.showDelay): void {
        if (!this.content || (this.isTooltipVisible() && !this.tooltipInstance.showTimeoutId && !this.tooltipInstance.hideTimeoutId)) {
            return;
        }
        const overlayRef = this.createOverlay();
        this.detach();
        this.portal = this.portal || new ComponentPortal(TooltipComponent, this.viewContainerRef);
        this.tooltipInstance = overlayRef.attach(this.portal).instance;
        this.tooltipInstance.afterHidden()
            .pipe(takeUntil(this.ngUnsubscribe$))
            .subscribe(() => this.detach());
        this.setTooltipClass(this.tooltipClass);
        this.updateTooltipContent();
        this.tooltipInstance.show(delay);
    }

    /** Hides the tooltip after the delay in ms, defaults to tooltip-delay-hide 100ms */
    hide(delay: number = this.hideDelay): void {
        if (this.tooltipInstance) {
            this.tooltipInstance.hide(delay);
        }
    }

    ngOnDestroy() {
        if (this.overlayRef) {
            this.overlayRef.dispose();
            this.tooltipInstance = null;
        }

        // 取消订阅
        this.ngUnsubscribe$.next();
        this.ngUnsubscribe$.complete();

        this.manualListeners.forEach((listener, event) => {
            this.elementRef.nativeElement.removeEventListener(event, listener);
        });
        this.manualListeners.clear();
        this.focusMonitor.stopMonitoring(this.elementRef);
    }
}
