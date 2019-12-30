import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-cube',
  templateUrl: './cube.component.html',
  styleUrls: ['./cube.component.scss']
})
export class CubeComponent implements OnInit {

  list: any[] = [];

  constructor() { }

  ngOnInit() {
    this.list = [1, 2, 3, 4, 5];
  }


}
