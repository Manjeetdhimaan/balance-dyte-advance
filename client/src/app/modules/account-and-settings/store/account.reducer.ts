import { Order } from "src/app/shared/models/order.model"
import { User } from "src/app/shared/models/user.model"
import * as AccountActions from "./account.actions"

export interface State {
    user: User,
    orders: Order[]
}

const initialState: State = {
    user: null,
    orders: []
}

export const accountReducer = (state: State = initialState, action: any) => {
    switch (action.type) {
        case AccountActions.FETCH_USER_PROFILE:
            return {
                ...state,
                user: {...action.payload}
            };
        case AccountActions.FETCH_ORDERS:
            return {
                ...state,
                orders: [...state.orders, ...action.payload]
            };
        default: return state;
    }
}