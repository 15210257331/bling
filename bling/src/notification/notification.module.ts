import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NotificationComponent } from './notification.component';
import { NotificationContainerComponent } from './notification-container.component';
import { NOTIFICATION_DEFAULT_CONFIG_PROVIDER } from './notification.config';


@NgModule({
    declarations: [
        NotificationComponent,
        NotificationContainerComponent
    ],
    entryComponents: [
        NotificationContainerComponent
    ],
    providers: [
        NOTIFICATION_DEFAULT_CONFIG_PROVIDER,
    ],
    imports: [
        CommonModule,
        BrowserAnimationsModule
    ],
    exports: [
        NotificationComponent,
        NotificationContainerComponent
    ]
})
export class NotificationModule { }
