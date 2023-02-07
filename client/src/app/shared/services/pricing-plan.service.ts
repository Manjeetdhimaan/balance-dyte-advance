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
      mrpPrice: '2000',
      planName: 'Starter',
      currency: 'INR',
      planDuration: '15 days',
      inclusions: [
        'Routine Workouts',
        'Meal Plans & Analysis',
        'Weight Assessment',
        'Physical Activities'
      ],
      selectPlanBtnName: 'Purchase',
      planUrlLink: '/diet-plans/starter-plan'
    },

    {
      _id: 'p2',
      planPrice: '1400',
      mrpPrice: '2800',
      planName: 'Advance',
      currency: 'INR',
      planDuration: '30 days',
      inclusions: [
        'Routine Workouts',
        'Meal Plans & Analysis',
        'Weight Assessment',
        'Physical Activities'
      ],
      selectPlanBtnName: 'Purchase',
      planUrlLink: '/diet-plans/advance-plan'
    },

    {
      _id: 'p3',
      planPrice: '2000',
      mrpPrice: '4000',
      planName: 'Premium',
      currency: 'INR',
      planDuration: '90 days',
      inclusions: [
        'Routine Workouts',
        'Meal Plans & Analysis',
        'Weight Assessment',
        'Physical Activities',
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