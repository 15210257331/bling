import {
    Injectable,
    TemplateRef,
    ViewContainerRef,
    Injector,
    ApplicationRef,
    ComponentFactoryResolver,
    ComponentRef,
    Inject,
    Optional
} from '@angular/core';
import { Subject } from 'rxjs';
import { DomPortalOutlet, ComponentPortal } from '@angular/cdk/portal';
import { NotificationContainerComponent } from './notification-container.component';
import { NOTIFICATION_DEFAULT_CONFIG, NotificationConfig, NOTIFICATION_CONFIG } from './notification.config';

let globalCounter = 0;

@Injectable({
    providedIn: 'root'
})
export class NotificationService {

    notificationQueue$: Subject<any> = new Subject();

    notificationQueue: NotificationConfig[] = [];

    portalOutlet: any;

    private config: NotificationConfig;

    private containerRef: ComponentRef<NotificationContainerComponent>;

    constructor(
        private injector: Injector,
        private componentFactoryResolver: ComponentFactoryResolver,
        private appRef: ApplicationRef,
        @Inject(NOTIFICATION_DEFAULT_CONFIG) defaultConfig: NotificationConfig,
        @Optional() @Inject(NOTIFICATION_CONFIG) config: NotificationConfig,
    ) {
        this.config = { ...defaultConfig, ...config };
    }

    private _createNotification(option?: NotificationConfig) {
        if (!this.containerRef) {
            this.portalOutlet = new DomPortalOutlet(
                document.body,
                this.componentFactoryResolver,
                this.appRef,
                this.injector
            );
            const componentPortal = new ComponentPortal(NotificationContainerComponent, null);
            this.containerRef = this.portalOutlet.attachComponentPortal(componentPortal);
            Object.assign(this.containerRef.instance, {
                notificationQueue$: this.notificationQueue$,
                placement: option.placement || this.config.placement,
                top: option.top || this.config.top,
                bottom: option.bottom || this.config.bottom
            });
            this.containerRef.changeDetectorRef.detectChanges(); // 避免出现二次检查错误
        } else {

        }
    }

    create(option: NotificationConfig) {
        this._createNotification(option);
        if (this.notificationQueue.length > this.config.maxStack) {
            this.notificationQueue.shift();
        }
        const notificationConfig = Object.assign({}, this.config, { id: globalCounter++ }, option);
        this.notificationQueue.push(notificationConfig);
        this.notificationQueue$.next(this.notificationQueue);
    }

    success(title?: string, content?: string) {
        this.create({
            type: 'success',
            title: title || '成功',
            content
        });
    }

    info(title?: string, content?: string, detail?: string) {
        this.create({
            type: 'info',
            title: title || '提示',
            content,
        });
    }

    warning(title?: string, content?: string, detail?: string) {
        this.create({
            type: 'warning',
            title: title || '警告',
            content,
        });
    }

    error(title?: string, content?: string, detail?: string) {
        this.create({
            type: 'error',
            title: title || '错误',
            content,
        });
    }

    // 关闭notifica
    remove(id?: number | string) {
        if (!id) {
            this.notificationQueue = [];
            this.notificationQueue$.next(this.notificationQueue);
            // 同时清除portal
            if (this.portalOutlet) {
                this.portalOutlet.detach();
                this.containerRef = null;
            }
        } else {
            this.notificationQueue = this.notificationQueue.filter(item => {
                return item.id !== id;
            });
            this.notificationQueue$.next(this.notificationQueue);
        }
    }
}
