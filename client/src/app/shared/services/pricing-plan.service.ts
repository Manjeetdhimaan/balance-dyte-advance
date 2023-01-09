import { Injectable } from '@angular/core';
import { PricingPlan } from '../models/pricing-plan/pricing-plan.model';

@Injectable({
  providedIn: 'root'
})
export class PricingPlanService {

  constructor() { }

  pricingPlanData: PricingPlan[] = [
    {
      id:'p1',
      planPrice: '2500',
      planName: 'Starter',
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
      id:'p2',
      planPrice: '4500',
      planName: 'Advance',
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
      id:'p3',
      planPrice: '6500',
      planName: 'Premium',
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
  ]

  getPricingPlans() {
    return this.pricingPlanData.slice();
  }
}