import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-tooltip',
  templateUrl: './tooltip.component.html',
  styleUrls: ['./tooltip.component.scss']
})
export class TooltipComponent implements OnInit {

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
