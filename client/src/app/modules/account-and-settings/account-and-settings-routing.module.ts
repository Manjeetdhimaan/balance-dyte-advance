import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserAuthGuard } from 'src/app/shared/auth/user-auth.guard';
import { OrdersComponent } from './components/orders/orders.component';
import { ProfileComponent } from './components/profile/profile.component';


const routes: Routes = [
  {
    path: 'profile',canActivate: [UserAuthGuard], data: { title: 'User Profile' },children: [
      {
        path: '', component: ProfileComponent, canActivate: [UserAuthGuard], data: {title: 'User Profile'}
      },
      {
        path: 'my-orders', component: OrdersComponent, canActivate: [UserAuthGuard], data: {title: 'My orders'}
      }
    ]
  }
]
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AccountSettingsRoutingModule { }