import { InjectionToken } from '@angular/core';

export type BlTooltipPosition =
    | 'top'
    | 'topLeft'
    | 'topRight'
    | 'bottom'
    | 'bottomLeft'
    | 'bottomRight'
    | 'left'
    | 'leftTop'
    | 'leftBottom'
    | 'right'
    | 'rightTop'
    | 'rightBottom';

export type BlTooltipState = 'initial' | 'visible' | 'hidden';

export type BlTooltipTrigger = 'hover' | 'focus' | 'click';

export interface BlTooltipConfig {
    showDelay: number;
    hideDelay: number;
    touchendHideDelay: number;
    position?: BlTooltipPosition;
    trigger: BlTooltipTrigger;
    offset: number;
    tooltipPin: boolean;
    scrollThrottleSeconds: number;
    tooltipPanelClass: string;
}

export const BL_TOOLTIP_DEFAULT_CONFIG_TOKEN = new InjectionToken<BlTooltipConfig>('bl-tooltip-default-config');

export const blTooltipDefaultConfig: BlTooltipConfig = {
    showDelay: 200,
    hideDelay: 100,
    touchendHideDelay: 1500,
    trigger: 'hover',
    offset: 4,
    tooltipPin: false,
    scrollThrottleSeconds: 20,
    tooltipPanelClass: 'bl-tooltip-panel'
};

export const BL_TOOLTIP_DEFAULT_CONFIG_PROVIDER = {
    provide: BL_TOOLTIP_DEFAULT_CONFIG_TOKEN,
    useValue: blTooltipDefaultConfig
};
