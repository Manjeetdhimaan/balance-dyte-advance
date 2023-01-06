import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { PricingPlanComponent } from './components/resusable-components/pricing-plan/pricing-plan.component';

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
