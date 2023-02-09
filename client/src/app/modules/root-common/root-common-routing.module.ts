import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutComponent } from './components/about/about.component';
import { ContactComponent } from './components/contact/contact.component';
import { DietPlansComponent } from './components/diet-plans/diet-plans.component';
import { HomeComponent } from './components/home/home.component';
import { PlanDetailsComponent } from './components/plan-details/plan-details.component';
import { PrivacyPolicyComponent } from './components/privacy-policy/privacy-policy.component';
import { TermsConditionsComponent } from './components/terms-conditions/terms-conditions.component';
import { TestimonialsComponent } from './components/testimonials/testimonials.component';


const routes: Routes = [
    {
        path: '', component: HomeComponent, pathMatch: 'full', data: {title: 'We help you manage your weight with help of diet plan'}
    },
    {
        path: 'about', component: AboutComponent, data: {title: 'About'}
    },
    {
        path: 'privacy-and-refund-policies', component: PrivacyPolicyComponent, data: {title: 'Privacy and Refund Policy'}
    },
    {
        path: 'terms-conditions', component: TermsConditionsComponent, data: {title: 'Terms and Conditions'}
    },
    {
        path: 'testimonials', component: TestimonialsComponent, data: {title: 'Client Testimonials'}
    },
    {
        path: 'contact', component: ContactComponent, data: {title: 'Contact Us'}
    },
    {
        path: 'diet-plans', component: DietPlansComponent, data: {title: 'Diet Plans'}
    },
    {
        path: 'diet-plans/:planName', component: PlanDetailsComponent, data: {title: 'Plan Details', isPlanDetalsComponent: true}
    }
]
@NgModule({
  imports: [
    RouterModule.forChild(routes),
],
  exports: [RouterModule]
})
export class RootCommonRoutingModule { }