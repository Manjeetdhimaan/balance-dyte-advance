import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccountSettingsRoutingModule } from './account-and-settings-routing.module';
import { ProfileComponent } from './components/profile/profile.component';
import { ChangePasswordComponent } from './components/settings/change-password/change-password.component';
import { EditProfileComponent } from './components/settings/edit-profile/edit-profile.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';
import { OrdersComponent } from './components/orders/orders.component';
import { OrderComponent } from './components/orders/order/order.component';
import { RouterModule } from '@angular/router';

import { NgProgressModule } from 'ngx-progressbar';
import { NgProgressHttpModule } from "ngx-progressbar/http";

@NgModule({
  declarations: [
    ProfileComponent,
    EditProfileComponent,
    ChangePasswordComponent,
    OrdersComponent,
    OrderComponent
  ],
  imports: [
    CommonModule,
    AccountSettingsRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    RouterModule,
    NgProgressModule.withConfig({
      color: "green"
    }),
    NgProgressHttpModule
  ]
})
export class AccountAndSettingsModule { }
