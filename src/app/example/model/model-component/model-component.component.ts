import { Component, OnInit, Input, TemplateRef } from '@angular/core';
import { ThyDialogRef, ThyDialog } from 'bling/src/public-api';


@Component({
  selector: 'app-model-component',
  templateUrl: './model-component.component.html',
  styleUrls: ['./model-component.component.scss']
})
export class ModelComponentComponent implements OnInit {

  @Input() data: string;

  constructor(
    private thyDialogRef: ThyDialogRef<any>,
    public thyDialog: ThyDialog
  ) { }

  ngOnInit() {
    console.log(this.data);
  }

  close() {
    this.thyDialogRef.close();
  }
  showMore = false;

  allowClear = true;



  openSubDialog(template: TemplateRef<any>) {
    this.thyDialog.open(template);
  }

  ok() {
    this.thyDialogRef.close();
  }

  toggleShowMore() {
    this.showMore = !this.showMore;
  }


}
