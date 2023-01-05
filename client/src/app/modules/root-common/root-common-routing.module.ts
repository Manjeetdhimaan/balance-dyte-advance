import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutComponent } from './components/about/about.component';
import { ContactComponent } from './components/contact/contact.component';
import { DietPlansComponent } from './components/diet-plans/diet-plans.component';
import { HomeComponent } from './components/home/home.component';
import { PlanDetailsComponent } from './components/plan-details/plan-details.component';
import { PrivacyPolicyComponent } from './components/privacy-policy/privacy-policy.component';


const routes: Routes = [
    {
        path: '', component: HomeComponent, pathMatch: 'full', data: {title: 'Balance Your Diet'}
    },
    {
        path: 'about', component: AboutComponent, data: {title: 'About'}
    },
    {
        path: 'privacy-policy', component: PrivacyPolicyComponent, data: {title: 'Privacy Policy'}
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