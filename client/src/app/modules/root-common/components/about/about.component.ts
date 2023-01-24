import { Component, OnInit } from '@angular/core';
import { fade, fallIn } from 'src/app/shared/common/animations';
import { PricingPlan } from 'src/app/shared/models/pricing-plan/pricing-plan.model';
import { PricingPlanApiService } from 'src/app/shared/services/pricing-plan-api.service';
import { PricingPlanService } from 'src/app/shared/services/pricing-plan.service';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css'],
  animations: [fallIn()],
  host: { '[@fallIn]': '' }
})
export class AboutComponent implements OnInit {
  pricingPlanData: PricingPlan[] = [];
  isLoading: boolean = false;

  constructor(private pricingPlanService: PricingPlanService, private pricingPlanApiService: PricingPlanApiService) { }

  ngOnInit(): void {
  }

  scrollTop() {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    })
  }
}
