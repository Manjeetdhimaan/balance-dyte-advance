import * as AuthActions from "./auth.actions"

export interface State {
    isLoggedInUser: boolean
}

const initialState: State = {
    isLoggedInUser: false
}

export const authReducer = (state: State = initialState, action: any) => {
    switch (action.type) {
        case AuthActions.USER_LOGOUT:
            return {
                ...state,
                isLoggedInUser: false
            };
        default: return state;
    }
}