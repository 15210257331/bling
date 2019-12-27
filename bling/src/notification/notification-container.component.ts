import { Component, OnInit, HostBinding, Optional, Inject, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { NotificationConfig } from './notification.config';


@Component({
    selector: 'bl-notification-container',
    templateUrl: './notification-container.component.html'
})
export class NotificationContainerComponent implements OnInit {

    public notificationQueue$: Observable<NotificationConfig>;

    public notificationQueue: Array<NotificationConfig> = [];

    _placement: number | string;

    _top: number | string;

    _bottom: number | string;

    @Input()
    set placement(value: number | string) {
        this._placement = value;
    }

    @Input()
    set top(value: string | number) {
        this._top = value;
    }

    @Input()
    set bottom(value: string | number) {
        this._bottom = value;
    }

    constructor() { }

    ngOnInit() {
        console.log(this._placement);
        this.setConfig();
        this.notificationQueue$.subscribe((data: any) => {
            this.notificationQueue = data || [];
        });
    }

    setConfig(): void {
        this.top = this._placement === 'topLeft' || this._placement === 'topRight' ? 30 : null;
        this.bottom = this._placement === 'bottomLeft' || this._placement === 'bottomRight' ? 40 : null;
    }
}
