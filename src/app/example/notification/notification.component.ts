import { Component, OnInit } from '@angular/core';
import { NotificationService } from 'bling/src/public-api';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss']
})
export class NotificationComponent implements OnInit {

  code = `info() {
    this.notificationService.info('info', 'info 提示');
  }`

  apis = [
    {
      property: 'type',
      description: 'notification类型 success | info | warning | error',
      type: 'string',
      default: 'success'
    },
    {
      property: 'title',
      description: '标题',
      type: 'string',
      default: null
    },
    {
      property: 'duration',
      description: '存在时间',
      type: 'number',
      default: '4000'
    },
    {
      property: 'maxStack',
      description: '最大存在数量',
      type: 'number',
      default: '7'
    },
    {
      property: 'pauseOnHover',
      description: '鼠标悬停是否一直存在',
      type: 'boolean',
      default: 'md'
    },
    {
      property: 'placement',
      description: '位置 topLeft| topRight | bottomLeft| bottomRight ',
      type: 'string',
      default: 'topRight'
    },
  ];

  constructor(
    private notificationService: NotificationService
  ) { }

  ngOnInit() {
  }

  info() {
    this.notificationService.info('info', 'info 提示');
  }
  warning() {
    this.notificationService.warning('warning', 'warning 提示');
  }
  success() {
    this.notificationService.success('success', 'success 提示');
  }
  error() {
    this.notificationService.error('error', 'error 提示');
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
