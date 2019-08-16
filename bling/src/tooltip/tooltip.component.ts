import {
    Component,
    ViewEncapsulation,
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    HostBinding,
    ElementRef,
    TemplateRef,
    OnInit
} from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { AnimationEvent } from '@angular/animations';

import { BlTooltipState } from './tooltip.config';
import { BlTooltipAnimations } from './tooltip.animation';
import { UpdateHostClassService } from '../shared/update-host-class.service';

@Component({
    selector: 'bl-tooltip',
    templateUrl: './tooltip.component.html',
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    animations: [BlTooltipAnimations],
    host: {
        '[@state]': 'visibility',
        '(@state.start)': 'animationStart()',
        '(@state.done)': 'animationDone($event)'
    },
    providers: [UpdateHostClassService]
})
export class TooltipComponent implements OnInit {

    @HostBinding(`class.bl-tooltip`) addTooltipContainerClass = true;

    _content: string | TemplateRef<HTMLElement>;

    data: any;

    private onHide: Subject<void> = new Subject();

    private closeOnInteraction = false;

    visibility: BlTooltipState = 'initial';

    showTimeoutId: number | null | any;

    hideTimeoutId: number | null | any;

    tooltipClasses: string[] = [];

    isTemplateRef = false;

    get content() {
        return this._content;
    }

    set content(value: string | TemplateRef<HTMLElement>) {
        this._content = value;
        this.isTemplateRef = value instanceof TemplateRef;
    }

    constructor(
        private changeDetectorRef: ChangeDetectorRef,
        private updateHostClassService: UpdateHostClassService,
        elementRef: ElementRef<HTMLElement>
    ) {
        updateHostClassService.initializeElement(elementRef);
    }

    ngOnInit() {}

    markForCheck(): void {
        this.changeDetectorRef.markForCheck();
    }

    isVisible() {
        return this.visibility === 'visible';
    }

    show(delay: number): void {
        // Cancel the delayed hide if it is scheduled
        if (this.hideTimeoutId) {
            clearTimeout(this.hideTimeoutId);
            this.hideTimeoutId = null;
        }

        // Body interactions should cancel the tooltip if there is a delay in showing.
        this.closeOnInteraction = true;
        this.showTimeoutId = setTimeout(() => {
            this.visibility = 'visible';
            this.showTimeoutId = null;
            this.markForCheck();
        }, delay);
    }

    hide(delay: number): void {
        // Cancel the delayed show if it is scheduled
        if (this.showTimeoutId) {
            clearTimeout(this.showTimeoutId);
            this.showTimeoutId = null;
        }

        this.hideTimeoutId = setTimeout(() => {
            this.visibility = 'hidden';
            this.hideTimeoutId = null;
            this.markForCheck();
        }, delay);
    }

    animationStart() {
        this.closeOnInteraction = false;
    }

    animationDone(event: AnimationEvent): void {
        const toState = event.toState as BlTooltipState;
        if (toState === 'hidden' && !this.isVisible()) {
            this.onHide.next();
        }
        if (toState === 'visible' || toState === 'hidden') {
            this.closeOnInteraction = true;
        }
    }

    afterHidden(): Observable<void> {
        return this.onHide.asObservable();
    }

    private updateClasses() {
        let classes: string[] = [];
        if (this.tooltipClasses) {
            classes = classes.concat(this.tooltipClasses);
        }
        this.updateHostClassService.updateClass(classes);
    }

    setTooltipClass(classes: string | string[]) {
        this.tooltipClasses = Array.isArray(classes) ? classes : [classes];
        this.updateClasses();
        // this.markForCheck();
    }
}
