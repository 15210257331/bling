import { Component, OnInit, TemplateRef, Input } from '@angular/core';
import { ThyDialogRef, ThyDialog } from 'mushroom-design/src/dialog';

@Component({
  selector: 'app-model',
  templateUrl: './model.component.html',
  styleUrls: ['./model.component.scss']
})
export class ModelComponent implements OnInit {

  @Input() data: string;

  constructor(
    private thyDialogRef: ThyDialogRef<any>, public thyDialog: ThyDialog
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
