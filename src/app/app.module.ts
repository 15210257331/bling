import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

// 引入模块
import { MushroomModule } from 'mushroom-design/src/public-api';
import { ModelComponent } from './model/model.component';

@NgModule({
  declarations: [
    AppComponent,
    ModelComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MushroomModule.forRoot()
  ],
  entryComponents: [
    ModelComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
