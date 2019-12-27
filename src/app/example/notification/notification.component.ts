import { Component, OnInit } from '@angular/core';
import { NotificationService } from 'bling/src/public-api';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss']
})
export class NotificationComponent implements OnInit {

  aa;

  apis = [
    {
      property: 'blType',
      description: '按钮类型 default | warning | danger | link | empty',
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

  constructor(
    private notificationService: NotificationService
  ) { }

  ngOnInit() {
  }

  info() {
    this.notificationService.success('info', 'info 提示');
  }
  warning() {
    this.notificationService.success('warning', 'warning 提示');
  }
  success() {
    this.notificationService.success('success', 'success 提示');
  }
  error() {
    this.notificationService.success('error', 'error 提示');
  }

  create(placement) {
    this.notificationService.remove();
    this.notificationService.create({
      type: 'success',
      title: '成功',
      content: placement + '位置',
      placement
    });
  }
}
