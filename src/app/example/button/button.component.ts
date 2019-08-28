import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss']
})
export class ButtonComponent implements OnInit {

  apis = [
    {
      property: 'blType',
      description: '按钮类型 default | warning | danger | link | empty' ,
      type: 'string',
      default: 'default'
    },
    {
      property: 'blSquare',
      description: '是否圆角',
      type: 'boolean',
      default: 'false'
    },
    {
      property: 'blDisabled',
      description: '是否禁用',
      type: 'boolean',
      default: 'false'
    },
    {
      property: 'blSize',
      description: '大小 md| lg | sm ',
      type: 'string',
      default: 'md'
    },
  ];

  aa = `<button blSize="lg" bl-button [blType]="'empty'" [blSquare]="false">lg按钮</button>`

  constructor() { }

  ngOnInit() {
  }

}
