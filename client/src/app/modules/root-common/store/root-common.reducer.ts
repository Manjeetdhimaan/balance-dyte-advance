import { PricingPlan } from "src/app/shared/models/pricing-plan.model";
import { Testimonial } from "src/app/shared/models/testimonials.model";
import * as RootCommonActions from "./root-common.actions";

export interface State {
    testimonials: Testimonial[];
    pricingPlans: PricingPlan[];
}

const initialState: State = {
    testimonials: [],
    pricingPlans: []
}

export const rootCommonReducer = (
    state: State = initialState,
    action: any
) => {
    switch (action.type) {
        case (RootCommonActions.FETCH_TESTIMONIALS):
            return {
                ...state,
                testimonials: [...state.testimonials, ...action.payload]
            };
        case (RootCommonActions.FETCH_PRICING_PLANS):
            return {
                ...state,
                pricingPlans: [...state.pricingPlans, ...action.payload]
            };
        default: return state;
    }
}