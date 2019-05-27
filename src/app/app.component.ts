import { Component } from '@angular/core';
import { ThyDialog } from 'mushroom-design/src/dialog';
import { ModelComponent } from './model/model.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(
    public thyDialog: ThyDialog
  ) { }


  openDailog() {
    this.thyDialog.open(
      ModelComponent,
      {
        initialState: {
          data: '123'
        }
      }
    )
  }
}
