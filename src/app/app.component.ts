import { Component, OnInit } from '@angular/core';
import { navList } from './app-routing.module';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  list: any[] = [];


  constructor(
    private router: Router
  ) { }

  ngOnInit() {
    this.list = navList;
  }
}
