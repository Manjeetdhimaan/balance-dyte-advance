import { animate, style, transition, trigger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { fade } from 'src/app/shared/common/animations';
import { PricingPlan } from 'src/app/shared/models/pricing-plan/pricing-plan.model';
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

  constructor(private pricingPlanService: PricingPlanService) { }

  ngOnInit(): void {
    this.scrollTop();
    this.pricingPlanData = this.pricingPlanService.pricingPlanData;
  }

  scrollTop() {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    })
  }
}
