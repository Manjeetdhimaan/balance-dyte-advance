import { Component } from '@angular/core';
import { fallIn, moveIn } from 'src/app/shared/common/animations';
import { PricingPlan } from 'src/app/shared/models/pricing-plan/pricing-plan.model';
import { PricingPlanApiService } from 'src/app/shared/services/pricing-plan-api.service';
import { PricingPlanService } from 'src/app/shared/services/pricing-plan.service';

@Component({
  selector: 'app-diet-plans',
  templateUrl: './diet-plans.component.html',
  styleUrls: ['./diet-plans.component.css'],
  animations: [moveIn(), fallIn()],
  host: { '[@fallIn]': '' }
})
export class DietPlansComponent {

  pricingPlanData: PricingPlan[] = [];
  isLoading: boolean = false;
  state: string = '';
  constructor(private pricingPlanService: PricingPlanService, private pricingPlanApiService: PricingPlanApiService) {
  }

  ngOnInit(): void {
  }

  scrollTop() {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    })
  }

}
