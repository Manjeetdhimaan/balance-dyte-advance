import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { RootCommonRoutingModule } from './root-common-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';

import { HomeComponent } from './components/home/home.component';
import { AboutComponent } from './components/about/about.component';
import { PrivacyPolicyComponent } from './components/privacy-policy/privacy-policy.component';
import { ContactComponent } from './components/contact/contact.component';
import { PlanDetailsComponent } from './components/plan-details/plan-details.component';
import { DietPlansComponent } from './components/diet-plans/diet-plans.component';
import { TermsConditionsComponent } from './components/terms-conditions/terms-conditions.component';

@NgModule({
  declarations: [
    HomeComponent,
    AboutComponent,
    PrivacyPolicyComponent,
    ContactComponent,
    PlanDetailsComponent,
    DietPlansComponent,
    TermsConditionsComponent
  ],
  imports: [
    CommonModule,
    RootCommonRoutingModule,
    SharedModule,
    ReactiveFormsModule,
    FormsModule
  ],
  providers: []
})
export class RootCommonModule { }
