import { Component, OnInit } from '@angular/core';
import { fade } from 'src/app/shared/common/animations';
import { PricingPlan } from 'src/app/shared/models/pricing-plan/pricing-plan.model';
import { PricingPlanApiService } from 'src/app/shared/services/pricing-plan-api.service';
import { PricingPlanService } from 'src/app/shared/services/pricing-plan.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  animations: [
    fade
  ]
})
export class HomeComponent implements OnInit {
  constructor(private pricingPlanService: PricingPlanService, private pricingPlanApiService: PricingPlanApiService) {

  }

  pricingPlanData: PricingPlan[] = [];
  isLoading: boolean = false;

  ngOnInit(): void {

    this.isLoading = true;
    this.pricingPlanApiService.getPricingPlans().subscribe(async (res: any) => {
      this.pricingPlanData = await res['plans'];
      this.isLoading = false;
    }, err => {
      console.log(err);
      this.pricingPlanData = this.pricingPlanService.getPricingPlans();
      this.isLoading = false;
    })
  }


  scrollTop() {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    })
  }
}
