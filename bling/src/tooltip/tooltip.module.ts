import { OverlayModule } from '@angular/cdk/overlay';
import { A11yModule } from '@angular/cdk/a11y';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { HAMMER_GESTURE_CONFIG } from '@angular/platform-browser';
import { BlTooltipDirective } from './tooltip.directive';
import { TooltipComponent } from './tooltip.component';
import { BL_TOOLTIP_DEFAULT_CONFIG_PROVIDER } from './tooltip.config';


@NgModule({
    imports: [
        A11yModule,
        CommonModule,
        OverlayModule
    ],
    exports: [
        BlTooltipDirective
    ],
    declarations: [
        BlTooltipDirective,
        TooltipComponent
    ],
    entryComponents: [
        TooltipComponent
    ],
    providers: [
        BL_TOOLTIP_DEFAULT_CONFIG_PROVIDER
    ]
})

export class TooltipModule { }
