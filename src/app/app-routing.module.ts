import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ButtonComponent } from './example/button/button.component';
import { PageComponent } from './example/page/page.component';
import { ModelComponent } from './example/model/model.component';
import { LoadingComponent } from './example/loading/loading.component';
import { TooltipComponent } from './example/tooltip/tooltip.component';
import { SwitchComponent } from './example/switch/switch.component';
import { NotificationComponent } from './example/notification/notification.component';
import { CubeComponent } from './example/cube/cube.component';

export const navList = [
  { path: 'button', component: ButtonComponent, data: {name: '按钮'}  },
  { path: 'page', component: PageComponent, data: {name: '分页'} },
  { path: 'model', component: ModelComponent, data: {name: '弹窗'} },
  { path: 'loading', component: LoadingComponent, data: {name: '加载中...'} },
  { path: 'tooltip', component: TooltipComponent, data: {name: '提示'} },
  { path: 'switch', component: SwitchComponent, data: {name: '开关'} },
  { path: 'notification', component: NotificationComponent, data: {name: '消息通知'} },
  { path: 'cube', component: CubeComponent, data: {name: 'cube'} },
];

const routes: Routes = [
  { path: '', redirectTo: 'button', pathMatch: 'full' },
  ...navList
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
