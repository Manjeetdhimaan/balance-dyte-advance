import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PricingPlanComponent } from './components/resusable-components/pricing-plan/pricing-plan.component';
import { RouterModule } from '@angular/router';




@NgModule({
  declarations: [
    PricingPlanComponent
  ],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports: [
    PricingPlanComponent
  ]
})
export class SharedModule { }
