import { Action } from "@ngrx/store";
import { PricingPlan } from "src/app/shared/models/pricing-plan.model";
import { Testimonial } from "src/app/shared/models/testimonials.model";

export const FETCH_TESTIMONIALS = "[RootCommon] FETCH_TESTIMONIALS";
export const FETCH_PRICING_PLANS = "[RootCommon] FETCH_PRICING_PLANS";

export class FetchTestimonials implements Action {
    readonly type = FETCH_TESTIMONIALS;
    constructor(public payload: Testimonial[]) { }
}

export class FetchPricingPlans implements Action {
    readonly type = FETCH_PRICING_PLANS;
    constructor(public payload: PricingPlan[]) { }
}

export type RootCommonActions = FetchTestimonials | FetchPricingPlans;