import { Component, OnInit } from '@angular/core';
import { ThyDialog } from 'bling/src/public-api';
import { ModelComponentComponent } from './model-component/model-component.component';

@Component({
  selector: 'app-model',
  templateUrl: './model.component.html',
  styleUrls: ['./model.component.scss']
})
export class ModelComponent implements OnInit {

  constructor(
    public thyDialog: ThyDialog
  ) { }

  ngOnInit() {
  }

  openDailog() {  // initialState 是一个对象
    this.thyDialog.open(
      ModelComponentComponent,
      {
        initialState: {
          data: '123'
        },
        width: '85vw'
      }
    )
  }

}
