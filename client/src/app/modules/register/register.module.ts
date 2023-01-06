import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RegisterRoutingModule } from './register-routing.module';

import { UserLoginComponent } from './components/user-login/user-login.component';
import { UserSignUpComponent } from './components/user-sign-up/user-sign-up.component';
import { RequestResetComponent } from './components/reset-password/request-reset/request-reset.component';
import { ResponseResetComponent } from './components/reset-password/response-reset/response-reset.component';

@NgModule({
  declarations: [
    UserLoginComponent,
    UserSignUpComponent,
    RequestResetComponent,
    ResponseResetComponent
  ],
  imports: [
    CommonModule,
    RegisterRoutingModule
  ]
})
export class RegisterModule { }
