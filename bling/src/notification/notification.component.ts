import { Component, Input, HostBinding, OnInit, HostListener, OnDestroy, ElementRef, ViewEncapsulation } from '@angular/core';
import { NotificationConfig } from './notification.config';
import { NotificationService } from './notification.service';
import { notificationAnimations } from './notification-animation';

@Component({
    selector: 'bl-notification',
    encapsulation: ViewEncapsulation.None,
    templateUrl: './notification.component.html',
    animations: notificationAnimations
})
export class NotificationComponent implements OnInit, OnDestroy {

    @HostBinding('@flyInOut') flyInOut = 'in'; // 绑定初始动画状态

    @HostBinding('class.bl-notification') className = true;

    option: NotificationConfig;

    notifyIconName = '';

    closeTimer: any;

    @Input()
    set data(value: NotificationConfig) {
        this.option = value;
    }

    @HostListener('mouseenter') mouseenter() {
        if (this.option.pauseOnHover) {
            clearInterval(this.closeTimer);
        }
    }

    @HostListener('mouseleave') mouseleave() {
        if (this.option.pauseOnHover) {
            this._creatCloseTimer();
        }
    }

    constructor(private notificationService: NotificationService) {}

    ngOnInit() {
        const iconName = {
            success: 'check-circle-fill',
            info: 'info-circle-fill',
            warning: 'waring-fill',
            error: 'close-circle-fill'
        };
        this.notifyIconName = iconName[this.option.type];
        this._creatCloseTimer();
    }

    close() {
        this.notificationService.remove(this.option.id);
    }

    private _creatCloseTimer() {
        if (this.option.duration) {
            this.closeTimer = setInterval(() => {
                clearInterval(this.closeTimer);
                this.close();
            }, this.option.duration);
        }
    }

    ngOnDestroy() {
        clearInterval(this.closeTimer);
    }
}
