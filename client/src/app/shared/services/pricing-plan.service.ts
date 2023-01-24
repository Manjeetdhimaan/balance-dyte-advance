import { Injectable } from '@angular/core';
import { PricingPlan } from '../models/pricing-plan/pricing-plan.model';

@Injectable({
  providedIn: 'root'
})
export class PricingPlanService {
  pricingPlanData: PricingPlan[];

  backUppricingPlanData: PricingPlan[] = [
    {
      _id: 'p1',
      planPrice: '1000',
      planName: 'Starter',
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

  constructor() {

  }

  // getPricingPlansFromServer() {
  //   let pricingPlanData: any = [];
  //   this.pricingPlanApiService.getPricingPlans().subscribe(async (res: any) => {
  //     pricingPlanData = await res['plans'];
  //   }, err => {
  //     console.log(err);
  //   })
  //   return pricingPlanData;
  // }

  getPricingPlans() {
    return this.pricingPlanData ? this.pricingPlanData.slice() : this.backUppricingPlanData.slice();
  }
}