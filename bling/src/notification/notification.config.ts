import { InjectionToken, TemplateRef } from '@angular/core';

export interface NotificationConfig {
    id?: number;
    type?: 'success' | 'info' | 'warning' | 'error';
    title?: string;
    content?: string;
    template?: TemplateRef<{}>;
    duration?: number;  // 存在时间
    maxStack?: number;  // 同时最大存在数量
    pauseOnHover?: boolean; // 划过是否清除计时
    animate?: boolean;  // 是否添加动画
    top?: string | number;
    bottom?: string | number;
    placement?: 'topLeft' | 'topRight' | 'bottomLeft' | 'bottomRight' | string;
}

// 创建injectionToken
export const NOTIFICATION_DEFAULT_CONFIG = new InjectionToken<NotificationConfig>('NOTIFICATION_DEFAULT_CONFIG');
// 用于全局注册设置默认的配置参数
export const NOTIFICATION_CONFIG = new InjectionToken<NotificationConfig>('NOTIFICATION_CONFIG');

// 创建provider
export const NOTIFICATION_DEFAULT_CONFIG_PROVIDER = {
    provide: NOTIFICATION_DEFAULT_CONFIG,
    useValue: {
        type: 'success',
        title: 'success',
        duration: 4000,
        maxStack: 7,
        pauseOnHover: true,
        animate: true,
        top: 40,
        placement: 'topRight'
    }
};

