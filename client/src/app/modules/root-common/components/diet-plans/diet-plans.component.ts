import { Component } from '@angular/core';
import { PricingPlan } from 'src/app/shared/models/pricing-plan/pricing-plan.model';
import { PricingPlanService } from 'src/app/shared/services/pricing-plan.service';

@Component({
  selector: 'app-diet-plans',
  templateUrl: './diet-plans.component.html',
  styleUrls: ['./diet-plans.component.css']
})
export class DietPlansComponent {

  constructor(private pricingPlanService: PricingPlanService) {
  }

  pricingPlanData: PricingPlan[] = [];

  ngOnInit(): void {
    this.pricingPlanData = this.pricingPlanService.pricingPlanData;
  }

  scrollTop() {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    })
  }

}
