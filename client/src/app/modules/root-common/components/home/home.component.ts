import { Component, OnInit } from '@angular/core';
import { fade, fallIn } from 'src/app/shared/common/animations';
import { PricingPlan } from 'src/app/shared/models/pricing-plan.model';
import { PricingPlanApiService } from 'src/app/shared/services/pricing-plan-api.service';
import { PricingPlanService } from 'src/app/shared/services/pricing-plan.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  animations: [fallIn()],
  host: { '[@fallIn]': '' }
})
export class HomeComponent implements OnInit {
  constructor(private pricingPlanService: PricingPlanService, private pricingPlanApiService: PricingPlanApiService) {

  }

  pricingPlanData: PricingPlan[] = [];
  isLoading: boolean = false;

  ngOnInit(): void {

  }


  scrollTop() {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    })
  }
}
