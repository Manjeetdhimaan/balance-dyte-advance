import { animate, style, transition, trigger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { fade } from 'src/app/shared/common/animations';
import { PricingPlan } from 'src/app/shared/models/pricing-plan/pricing-plan.model';
import { PricingPlanApiService } from 'src/app/shared/services/pricing-plan-api.service';
import { PricingPlanService } from 'src/app/shared/services/pricing-plan.service';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css'],
  animations: [
    fade
  ]
})
export class AboutComponent implements OnInit {
  pricingPlanData: PricingPlan[] = [];
  isLoading: boolean = false;

  constructor(private pricingPlanService: PricingPlanService, private pricingPlanApiService: PricingPlanApiService) { }

  ngOnInit(): void {
    this.scrollTop();
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
