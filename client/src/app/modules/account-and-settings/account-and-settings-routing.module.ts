import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserAuthGuard } from 'src/app/shared/auth/user-auth.guard';
import { OrderComponent } from './components/orders/order/order.component';
import { OrdersComponent } from './components/orders/orders.component';
import { ProfileComponent } from './components/profile/profile.component';
import { ChangePasswordComponent } from './components/settings/change-password/change-password.component';

const routes: Routes = [
  {
    path: 'profile',canActivate: [UserAuthGuard], data: { title: 'User Profile' },children: [
      {
        path: '', component: ProfileComponent, canActivate: [UserAuthGuard], data: {title: 'User Profile'}
      },
      {
        path: 'orders', component: OrdersComponent, canActivate: [UserAuthGuard], data: {title: 'My orders'}, children: [
          {
            path: 'view-order/:orderId', component: OrderComponent, canActivate: [UserAuthGuard], data: {title: 'View order details'}
          }
        ]
      }
    ]
  },
  {
    path: 'settings/change-password', component: ChangePasswordComponent, canActivate: [UserAuthGuard], data: {title: 'Change Password'}
  }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class AccountSettingsRoutingModule { }