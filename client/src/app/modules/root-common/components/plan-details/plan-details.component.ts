import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PricingPlan } from 'src/app/shared/models/pricing-plan/pricing-plan.model';

import { PricingPlanService } from 'src/app/shared/services/pricing-plan.service';

@Component({
  selector: 'app-plan-details',
  templateUrl: './plan-details.component.html',
  styleUrls: ['./plan-details.component.css']
})
export class PlanDetailsComponent implements OnInit {
  constructor (private pricingPlanService: PricingPlanService, private router: Router) {}
  pricingPlans: PricingPlan[] = [];
  selectedPricingPlan: PricingPlan;

  ngOnInit(): void {
    this.pricingPlans = this.pricingPlanService.getPricingPlans();
    if(this.pricingPlans.length>0) {
      this.pricingPlans.map((plan: PricingPlan) => {
        if(this.router.url.toLowerCase() === plan['planRouterLink'].toLowerCase()) {
          this.selectedPricingPlan = plan;
          console.log(plan);
        }
      })

      if (this.router.url.toLowerCase() !== this.selectedPricingPlan?.['planRouterLink'].toLowerCase()) {
        this.router.navigate(['/not-found'])
      }
    }
  }

  order() {
    console.log(this.selectedPricingPlan['planPrice']);
  }
}
