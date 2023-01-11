import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserAuthGuard } from 'src/app/shared/auth/user-auth.guard';
import { ProfileComponent } from './components/profile/profile.component';


const routes: Routes = [
  {
    path: 'profile', component: ProfileComponent, canActivate: [UserAuthGuard], data: { title: 'User Profile' }
  }
]
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AccountSettingsRoutingModule { }