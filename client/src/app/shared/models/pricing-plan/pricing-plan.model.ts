export interface PricingPlan {
    id: string | number;
    planPrice: string;
    planName: string;
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
  