import { Component, OnInit } from '@angular/core';
import { NotificationService } from 'bling/src/public-api';

@Component({
  selector: 'app-switch',
  templateUrl: './switch.component.html',
  styleUrls: ['./switch.component.scss']
})
export class SwitchComponent implements OnInit {

  value = false;

  aa = `<bl-switch></bl-switch>`;

  constructor(
    private notificationService: NotificationService
  ) { }

  ngOnInit() {

  }
  open() {
    this.notificationService.success('测试', 'this is content');
  }

}
