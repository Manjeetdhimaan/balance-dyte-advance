import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RegisterRoutingModule } from './register-routing.module';

import { UserLoginComponent } from './components/user-login/user-login.component';
import { UserSignUpComponent } from './components/user-sign-up/user-sign-up.component';
import { RequestResetComponent } from './components/reset-password/request-reset/request-reset.component';
import { ResponseResetComponent } from './components/reset-password/response-reset/response-reset.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';
import { NgProgressModule } from 'ngx-progressbar';
import { NgProgressHttpModule } from "ngx-progressbar/http";

@NgModule({
  declarations: [
    UserLoginComponent,
    UserSignUpComponent,
    RequestResetComponent,
    ResponseResetComponent
  ],
  imports: [
    CommonModule,
    RegisterRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    NgProgressModule.withConfig({
      color: "green"
    }),
    NgProgressHttpModule
  ]
})
export class RegisterModule { }
