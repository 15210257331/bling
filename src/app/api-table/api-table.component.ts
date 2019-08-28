import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-api-table',
  templateUrl: './api-table.component.html',
  styleUrls: ['./api-table.component.scss']
})
export class ApiTableComponent implements OnInit {

  @Input() apis: any[] = [];

  constructor() { }

  ngOnInit() {
  }

}
