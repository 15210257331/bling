import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { HighlightModule } from 'ngx-highlightjs';
import xml from 'highlight.js/lib/languages/xml';
import scss from 'highlight.js/lib/languages/scss';
import typescript from 'highlight.js/lib/languages/typescript';

// 引入模块
import { BlingModule } from '../../bling/src/module';

import { ButtonComponent } from './example/button/button.component';
import { PageComponent } from './example/page/page.component';
import { ModelComponentComponent } from './example/model/model-component/model-component.component';
import { ModelComponent } from './example/model/model.component';
import { LoadingComponent } from './example/loading/loading.component';
import { TooltipComponent } from './example/tooltip/tooltip.component';
import { ApiTableComponent } from './api-table/api-table.component';
import { SwitchComponent } from './example/switch/switch.component';
import { NotificationComponent } from './example/notification/notification.component';
import { CubeComponent } from './example/cube/cube.component';

export function hljsLanguages() {
  return [
    {name: 'typescript', func: typescript},
    {name: 'scss', func: scss},
    {name: 'xml', func: xml}
  ];
}


@NgModule({
  declarations: [
    AppComponent,
    ButtonComponent,
    PageComponent,
    ModelComponent,
    ModelComponentComponent,
    LoadingComponent,
    TooltipComponent,
    ApiTableComponent,
    SwitchComponent,
    NotificationComponent,
    CubeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    BlingModule.forRoot(),
    HighlightModule.forRoot({
      languages: hljsLanguages
    })
  ],
  entryComponents: [
    ModelComponentComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
