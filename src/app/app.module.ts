import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

// 引入模块
import { MushroomModule } from 'bling/src/public-api';

import { ButtonComponent } from './example/button/button.component';
import { PageComponent } from './example/page/page.component';
import { ModelComponentComponent } from './example/model/model-component/model-component.component';
import { ModelComponent } from './example/model/model.component';

@NgModule({
  declarations: [
    AppComponent,
    ButtonComponent,
    PageComponent,
    ModelComponent,
    ModelComponentComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MushroomModule.forRoot()
  ],
  entryComponents: [
    ModelComponentComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
