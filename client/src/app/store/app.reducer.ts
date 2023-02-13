import { ActionReducer, ActionReducerMap, INIT, State } from "@ngrx/store";

import * as fromRootCommon from "../modules/root-common/store/root-common.reducer";
import * as fromAccount from "../modules/account-and-settings/store/account.reducer";
import * as fromAuth from "../modules/register/store/auth.reducer";
import { USER_LOGOUT } from "../modules/register/store/auth.actions";

export interface AppState {
    rootCommon: fromRootCommon.State,
    account: fromAccount.State,
    auth: fromAuth.State
}

export const appReducer: ActionReducerMap<AppState> = {
    rootCommon: fromRootCommon.rootCommonReducer,
    account: fromAccount.accountReducer,
    auth: fromAuth.authReducer
}

export function clearState(reducer: ActionReducer<AppState>): ActionReducer<AppState> {
    return function(state: AppState, action: any): AppState {
      if (action.type === USER_LOGOUT) {
        state = undefined
        // return reducer(state = {} as State, { type: INIT });
      }
      return reducer(state, action);
    };
  }
