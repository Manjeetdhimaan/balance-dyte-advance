import { Component } from '@angular/core';
import { fade } from 'src/app/shared/common/animations';
import { PricingPlan } from 'src/app/shared/models/pricing-plan/pricing-plan.model';
import { PricingPlanService } from 'src/app/shared/services/pricing-plan.service';

@Component({
  selector: 'app-diet-plans',
  templateUrl: './diet-plans.component.html',
  styleUrls: ['./diet-plans.component.css'],
  animations: [
    fade
  ]
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
