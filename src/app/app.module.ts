import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

// 引入模块
import { BlingModule } from '../../bling/src/module';

import { ButtonComponent } from './example/button/button.component';
import { PageComponent } from './example/page/page.component';
import { ModelComponentComponent } from './example/model/model-component/model-component.component';
import { ModelComponent } from './example/model/model.component';
import { LoadingComponent } from './example/loading/loading.component';


@NgModule({
  declarations: [
    AppComponent,
    ButtonComponent,
    PageComponent,
    ModelComponent,
    ModelComponentComponent,
    LoadingComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    BlingModule.forRoot()
  ],
  entryComponents: [
    ModelComponentComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
