import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { PricingPlanComponent } from './components/resusable-components/pricing-plan/pricing-plan.component';
import { ModelComponent } from './components/ui-components/model/model.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SpinnerComponent } from './components/ui-components/spinner/spinner.component';
import { AccordionComponent } from './components/ui-components/accordion/accordion.component';
import { AccordionItemComponent } from './components/ui-components/accordion/accordion-item/accordion-item.component';
import { NutritiousFoodsComponent } from './components/resusable-components/nutritious-foods/nutritious-foods.component';

@NgModule({
  declarations: [
    PricingPlanComponent,
    ModelComponent,
    SpinnerComponent,
    AccordionComponent,
    AccordionItemComponent,
    NutritiousFoodsComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  exports: [
    PricingPlanComponent,
    ModelComponent,
    SpinnerComponent,
    AccordionComponent,
    AccordionItemComponent,
    NutritiousFoodsComponent
  ]
})
export class SharedModule { }
