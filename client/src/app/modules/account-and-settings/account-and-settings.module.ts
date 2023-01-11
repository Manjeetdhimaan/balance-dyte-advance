import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccountSettingsRoutingModule } from './account-and-settings-routing.module';
import { ProfileComponent } from './components/profile/profile.component';
import { ChangePasswordComponent } from './components/settings/change-password/change-password.component';
import { EditProfileComponent } from './components/settings/edit-profile/edit-profile.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';



@NgModule({
  declarations: [
    ProfileComponent,
    EditProfileComponent,
    ChangePasswordComponent
  ],
  imports: [
    CommonModule,
    AccountSettingsRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule
  ]
})
export class AccountAndSettingsModule { }
