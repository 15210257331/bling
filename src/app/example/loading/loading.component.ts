import { Component, OnInit } from '@angular/core';
import { BlLoadingService } from '../../../../bling/src/loading/loading.service';

@Component({
  selector: 'app-loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.scss']
})
export class LoadingComponent implements OnInit {

  constructor(
    private blLoadingService: BlLoadingService
  ) { }

  ngOnInit() {
   
  }

  showloading() {
    this.blLoadingService.show();
    setTimeout(() => {
      this.blLoadingService.hide();
    }, 3000)
  }

}
