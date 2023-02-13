import { Action } from "@ngrx/store";


export const USER_LOGIN = "[Auth] FETCH_USER_PROFILE";
export const USER_LOGOUT= "[Auth] USER_LOGOUT";


export class UserLogout implements Action {
    readonly type = USER_LOGOUT;
}

export class UserLogIn implements Action {
    readonly type = USER_LOGIN;
}

export type AccountActions = UserLogout | UserLogIn;