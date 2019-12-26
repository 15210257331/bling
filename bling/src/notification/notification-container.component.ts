import { Component, OnInit, HostBinding, Optional, Inject } from '@angular/core';
import { Observable } from 'rxjs';
import { NotificationConfig } from './notification.config';


@Component({
    selector: 'bl-notification-container',
    templateUrl: './notification-container.component.html'
})
export class NotificationContainerComponent implements OnInit {

    public notificationQueue$: Observable<NotificationConfig>;

    public notificationQueue: Array<NotificationConfig> = [];

    constructor() { }

    ngOnInit() {
        this.notificationQueue$.subscribe((data: any) => {
            this.notificationQueue = data || [];
        });
    }
}
