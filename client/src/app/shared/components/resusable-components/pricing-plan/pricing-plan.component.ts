import { Component, Input, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

import { PricingPlan } from 'src/app/shared/models/pricing-plan.model';
import { PricingPlanApiService } from 'src/app/shared/services/pricing-plan-api.service';
import { AppState } from 'src/app/store/app.reducer';
import * as RootCommonActions from "../../../../modules/root-common/store/root-common.actions";

@Component({
  selector: 'app-pricing-plan',
  templateUrl: './pricing-plan.component.html',
  styleUrls: ['./pricing-plan.component.css']
})
export class PricingPlanComponent implements OnInit {
  constructor (private pricingPlanApiService: PricingPlanApiService, private store: Store<AppState>) {}
  isLoading: boolean = false;
  serverErrMsg: string;
  @Input() pricingPlanData: PricingPlan[] = [];

  //just for reference
  localPricingPlans = [
    {
      _id: 'p1',
      planPrice: '1000',
      mrpPrice: '2000',
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
      mrpPrice: '2400',
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
      mrpPrice: '4000',
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
    }]

  ngOnInit() {
    this.isLoading = true;
    this.serverErrMsg = '';
    this.store.select('rootCommon').subscribe(stateData => {
      if (stateData.pricingPlans.length > 0) {
        this.pricingPlanData = stateData['pricingPlans'];
        this.isLoading = false;
        this.serverErrMsg = '';
      }
    }, err => {
      this.isLoading = false;
      this.serverErrMsg = "Error while fetching plans! Please try again."
      console.log(err);
    });

    if (this.pricingPlanData.length <= 0) {
      this.pricingPlanApiService.getPricingPlans().subscribe(async (res: any) => {
        this.store.dispatch(new RootCommonActions.FetchPricingPlans(res['plans']));
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
  }


  scrollTop() {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    })
  }
}
