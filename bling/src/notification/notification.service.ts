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

const NOTIFY_OPTION_DEFAULT = {
    duration: 4500,
    pauseOnHover: true,
    maxStack: 8
};
let globalCounter = 0;

@Injectable({
    providedIn: 'root'
})
export class NotificationService {

    notificationQueue$: Subject<any> = new Subject();

    notificationQueue: NotificationConfig[] = [];

    private _config: NotificationConfig;

    private containerRef: ComponentRef<NotificationContainerComponent>;

    constructor(
        private injector: Injector,
        private componentFactoryResolver: ComponentFactoryResolver,
        private appRef: ApplicationRef,
        @Inject(NOTIFICATION_DEFAULT_CONFIG) defaultConfig: NotificationConfig,
        @Optional() @Inject(NOTIFICATION_CONFIG) config: NotificationConfig,
    ) {
        this._config = { ...defaultConfig, ...config };
    }

    private _createNotification() {
        if (!this.containerRef) {
            const portalOutlet = new DomPortalOutlet(
                document.body,
                this.componentFactoryResolver,
                this.appRef,
                this.injector
            );
            const componentPortal = new ComponentPortal(NotificationContainerComponent, null);
            this.containerRef = portalOutlet.attachComponentPortal(componentPortal);
            Object.assign(this.containerRef.instance, {
                notificationQueue$: this.notificationQueue$
            });
            this.containerRef.changeDetectorRef.detectChanges();
        }
    }
    create(option: NotificationConfig) {
        this._createNotification();
        if (this.notificationQueue.length > this._config.maxStack) {
            this.notificationQueue.shift();
        }
        this.notificationQueue.push(this.mergeConfig(option));
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
    removeItemById(id?: number | string) {
        if (!id) {
            this.notificationQueue = [];
            this.notificationQueue$.next(this.notificationQueue);
        } else {
            this.notificationQueue = this.notificationQueue.filter(item => {
                return item.id !== id;
            });
            this.notificationQueue$.next(this.notificationQueue);
        }
    }
    mergeConfig(config: NotificationConfig) {
        return Object.assign({}, NOTIFY_OPTION_DEFAULT, { id: globalCounter++ }, config);
    }
}
