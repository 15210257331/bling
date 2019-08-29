import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-page',
  templateUrl: './page.component.html',
  styleUrls: ['./page.component.scss']
})
export class PageComponent implements OnInit {

  apis = [
    {
      property: 'curPage',
      description: '当前处在第几页' ,
      type: 'number',
      default: '1'
    },
    {
      property: 'totalNumber',
      description: '数据总条数' ,
      type: 'number',
      default: '0'
    },
    {
      property: 'pageSize',
      description: '每页条数' ,
      type: 'number',
      default: '10'
    },
    {
      property: 'pageChange',
      description: '页码改变触发函数' ,
      type: 'eventEmiter',
      default: 'void'
    },
  ];

  aa = `<bl-page [totalNumber]="128" [curPage]="3" [pageSize]="10"></bl-page>`;
  bb = `<bl-page [totalNumber]="128" [curPage]="3" [pageSize]="10"></bl-page>`;

  constructor() { }

  ngOnInit() {
  }

}
