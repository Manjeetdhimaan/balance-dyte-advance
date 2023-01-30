import { Component, Input, OnInit } from '@angular/core';
import { PricingPlan } from 'src/app/shared/models/pricing-plan/pricing-plan.model';
import { PricingPlanApiService } from 'src/app/shared/services/pricing-plan-api.service';

@Component({
  selector: 'app-pricing-plan',
  templateUrl: './pricing-plan.component.html',
  styleUrls: ['./pricing-plan.component.css']
})
export class PricingPlanComponent implements OnInit {
  constructor (private pricingPlanApiService: PricingPlanApiService) {}
  isLoading: boolean = false;
  serverErrMsg: string;
  @Input() pricingPlanData: PricingPlan[] = [
    {
      _id: 'p1',
      planPrice: '1000',
      planName: 'Starter',
      currency: 'INR',
      planDuration: '15 days',
      inclusions: [
        '20 Workouts',
        'Meal Plans & Analysis',
        'Weight Assessment',
        'Physical Activities',
        'Client Monitoring',
        '24/7 Support'
      ],
      selectPlanBtnName: 'Purchase',
      planUrlLink: '/diet-plans/starter-plan'
    },

    {
      _id: 'p2',
      planPrice: '1400',
      currency: 'INR',
      planName: 'Advance',
      planDuration: '30 days',
      inclusions: [
        '24 Workouts',
        'Meal Plans & Analysis',
        'Weight Assessment',
        'Physical Activities',
        'Client Monitoring',
        '24/7 Support'
      ],
      selectPlanBtnName: 'Purchase',
      planUrlLink: '/diet-plans/advance-plan'
    },

    {
      _id: 'p3',
      planPrice: '2000',
      currency: 'INR',
      planName: 'Premium',
      planDuration: '90 days',
      inclusions: [
        '30 Workouts',
        'Meal Plans & Analysis',
        'Weight Assessment',
        'Physical Activities',
        'Client Monitoring',
        '24/7 Support'
      ],
      selectPlanBtnName: 'Purchase',
      planUrlLink: '/diet-plans/premium-plan'
    }
  ];

  ngOnInit() {
    this.isLoading = true;
    this.pricingPlanApiService.getPricingPlans().subscribe(async (res: any) => {
      this.pricingPlanData = await res['plans'];
        this.isLoading = false;
        this.serverErrMsg = '';
    }, err => {
      console.log(err);
      this.serverErrMsg = "Error while fetching plans! Please try again."
      // this.pricingPlanData = this.pricingPlanService.getPricingPlans();
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
