import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-tooltip',
  templateUrl: './tooltip.component.html',
  styleUrls: ['./tooltip.component.scss']
})
export class TooltipComponent implements OnInit {

  apis = [
    {
      property: 'thyTooltip',
      description: '提示消息，可以是文本，也可以是一个模版',
      type: 'string | TemplateRef<HTMLElement>',
      default: ''
    },
    {
      property: 'thyTooltipTrigger',
      description: '触发提示方式，hover, focus, click',
      type: 'string',
      default: 'hover'
    },
    {
      property: 'thyTooltipPlacement',
      description: '提示位置， top | bottom | left | right',
      type: 'string',
      default: 'top'
    },
    {
      property: 'thyTooltipDisabled',
      description: '是否禁用提示',
      type: 'boolean',
      default: 'false'
    },
    {
      property: 'thyTooltipClass',
      description: '提示内容自定义样式',
      type: 'string | string[]',
      default: ''
    },
    {
      property: 'thyTooltipShowDelay',
      description: '显示提示内容延迟毫秒',
      type: 'number',
      default: '200'
    },
    {
      property: 'thyTooltipHideDelay',
      description: '隐藏提示内容延迟毫秒',
      type: 'number',
      default: '100'
    },
    {
      property: 'thyTooltipTemplateContext',
      description: '传入template时，注入给template的数据',
      type: 'any',
      default: 'null'
    },
    {
      property: 'thyTooltipOffset',
      description: '偏移量',
      type: 'number',
      default: '4'
    },
    {
      property: 'thyTooltipPin',
      description: 'hover触发方式下 鼠标移入Tooltip是否固定Tooltip',
      type: 'boolean',
      default: false
    }
  ];

  aa = `<span blTooltip="this is a hover tootip bling bling bling" [blTooltipTrigger]="'hover'"
  [blTooltipPlacement]="tooltipConfig.placement" [blTooltipShowDelay]="tooltipConfig.showDelay"
  [blTooltipHideDelay]="tooltipConfig.hideDelay" [blTooltipOffset]="tooltipConfig.offset"
  [blTooltipPin]="tooltipConfig.thyTooltipPin">
  hover show tootip
   </span>`

   bb = `<button bl-button [blType]="'warning'" [blSquare]="false" [blTooltip]="world"
   [blTooltipTrigger]="tooltipConfig.trigger" [blTooltipTemplateContext]="{ values: [1, 2, 3, 4] }"
   [blTooltipPlacement]="tooltipConfig.placement" [blTooltipOffset]="tooltipConfig.offset">
   Tooltip with Template
 </button>
 <ng-template #world let-data>
   <div>
     My custom tooltip message with template data
     <div *ngFor="let item of data.values">
       {{ item }}
     </div>
   </div>
 </ng-template>`

  constructor() { }

  ngOnInit() {
  }

  tooltipConfig = {
    trigger: 'hover',
    placement: 'top',
    disabled: false,
    showDelay: 200,
    hideDelay: 100,
    offset: 4,
    thyTooltipPin: true
  };

}
