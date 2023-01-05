import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-pricing-plan',
  templateUrl: './pricing-plan.component.html',
  styleUrls: ['./pricing-plan.component.css']
})
export class PricingPlanComponent {

 @Input() pricingPlanData: any[] = [
  {
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
    planRouterLink: 'diet-plans/starter-plan'
  },

  {
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
    planRouterLink: 'diet-plans/advance-plan'
  },

  {
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
    planRouterLink: 'diet-plans/premium-plan'
  }
]


  scrollTop() {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    })
  }
}
