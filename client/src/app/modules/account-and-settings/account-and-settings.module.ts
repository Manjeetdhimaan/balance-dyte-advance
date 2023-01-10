import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccountSettingsRoutingModule } from './account-and-settings-routing.module';
import { ProfileComponent } from './components/profile/profile.component';
import { EditProfileComponent } from './components/setting/edit-profile/edit-profile.component';
import { ChangePasswordComponent } from './components/settings/change-password/change-password.component';



@NgModule({
  declarations: [
    ProfileComponent,
    EditProfileComponent,
    ChangePasswordComponent
  ],
  imports: [
    CommonModule,
    AccountSettingsRoutingModule
  ]
})
export class AccountAndSettingsModule { }
