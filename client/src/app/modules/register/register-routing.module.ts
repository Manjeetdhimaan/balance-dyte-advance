import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RequestResetComponent } from './components/reset-password/request-reset/request-reset.component';
import { ResponseResetComponent } from './components/reset-password/response-reset/response-reset.component';

import { UserLoginComponent } from './components/user-login/user-login.component';
import { UserSignUpComponent } from './components/user-sign-up/user-sign-up.component';


const routes: Routes = [
    {
        path: 'login', component: UserLoginComponent, data: {title: 'User Login'}
    },
    {
        path: 'sign-up', component: UserSignUpComponent, data: {title: 'User Sign Up'}
    },
    {
        path: 'reset-password', component: RequestResetComponent, data: {title: 'Reset Password'}
    },
    {
        path: 'response-reset-password/:token', component: ResponseResetComponent, data: {title: 'Response Reset Password'}
    },
]
@NgModule({
  imports: [
    RouterModule.forChild(routes),
],
  exports: [RouterModule]
})
export class RegisterRoutingModule { }