import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ButtonComponent } from './example/button/button.component';
import { PageComponent } from './example/page/page.component';
import { ModelComponent } from './example/model/model.component';
import { LoadingComponent } from './example/loading/loading.component';
import { TooltipComponent } from './example/tooltip/tooltip.component';
import { SwitchComponent } from './example/switch/switch.component';
import { NotificationComponent } from './example/notification/notification.component';


const routes: Routes = [
  { path: '', redirectTo: 'button', pathMatch: 'full' },
  { path: 'button', component: ButtonComponent },
  { path: 'page', component: PageComponent },
  { path: 'model', component: ModelComponent },
  { path: 'loading', component: LoadingComponent },
  { path: 'tooltip', component: TooltipComponent },
  { path: 'switch', component: SwitchComponent },
  { path: 'notification', component: NotificationComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
