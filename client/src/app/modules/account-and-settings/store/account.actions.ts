import { Action } from "@ngrx/store";
import { Order } from "src/app/shared/models/order.model";
import { User } from "src/app/shared/models/user.model";


export const FETCH_USER_PROFILE = "[Account] FETCH_USER_PROFILE";
export const FETCH_ORDERS = "[Account] FETCH_ORDERS";

export class FetchUserProfile implements Action {
    readonly type = FETCH_USER_PROFILE;
    constructor(public payload: User) {}
}

export class FetchOrders implements Action {
    readonly type = FETCH_ORDERS;
    constructor(public payload: Order[]) {}
}

export type AccountActions = FetchUserProfile | FetchOrders;