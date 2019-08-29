import { Component, OnInit } from '@angular/core';
import { BlLoadingService } from '../../../../bling/src/loading/loading.service';

@Component({
  selector: 'app-loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.scss']
})
export class LoadingComponent implements OnInit {

  apis = [
    {
      property: 'bdOpacity',
      description: '背景透明度' ,
      type: 'number',
      default: 'default'
    },
    {
      property: 'bdColor',
      description: '背景色',
      type: 'boolean',
      default: 'false'
    },
    {
      property: 'size',
      description: '大小',
      type: 'boolean',
      default: 'false'
    },
    {
      property: 'color',
      description: 'loading图标颜色',
      type: 'string',
      default: 'void'
    },
    {
      property: 'type',
      description: 'loading图标样式',
      type: 'string',
      default: 'md'
    },
    {
      property: 'fullScreen',
      description: '是否展示全屏loading，在父div中显示要添加position:relative',
      type: 'boolean',
      default: 'true'
    },
  ];

  aa = `<bl-loading bdOpacity=0.7 bdColor="#666" size="medium" color="red" type="ball-beat" [fullScreen]="false">
  <p>加载中...</p>
</bl-loading>`

  constructor(
    private blLoadingService: BlLoadingService
  ) { }

  ngOnInit() {
   
  }

  showloading() {
    this.blLoadingService.show();
    setTimeout(() => {
      this.blLoadingService.hide();
    }, 20000);
  }

}
