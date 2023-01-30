export interface PricingPlan {
    _id: string | number;
    planPrice: string;
    planName: string;
    currency: string;
    planDuration: string;
    inclusions: any[];
    selectPlanBtnName: string;
    planUrlLink: string;
  }
  
  export interface UserList {
    createdAt: string;
    createdBy: string;
    email: string;
    firstName: string;
    id: number;
    lastName: string;
    updatedAt: string;
    updatedBy: string;
  }
  