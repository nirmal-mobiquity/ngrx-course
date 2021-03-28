import { routerReducer } from '@ngrx/router-store';
import {
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector,
  createReducer,
  createSelector,
  MetaReducer,
  on
} from '@ngrx/store';
import { Action } from 'rxjs/internal/scheduler/Action';
import { environment } from '../../environments/environment';
import { AuthActions } from '../auth/action-types';
import { User } from '../auth/model/user.model';


export interface AuthState {
  user: User
}
export interface AppState {

}
export const reducers: ActionReducerMap<AppState> = {
    router: routerReducer
};

export const initialAuthState: AuthState = {
  user: undefined
}

export  const authReducer  = createReducer(
  initialAuthState,
  on(AuthActions.login, (state, action) => {
    return{
      user: action.user
    }
  }),
  on(AuthActions.logout, (state, action) => {
    return{
      user: undefined
    }
  })
);

export function logger(reducer: ActionReducer<any>): ActionReducer<any> {
  return (state, action)  => {
    console.log("state before ", state);
    console.log("action before ", action);

    return reducer(state, action);
  }
}

export const metaReducers: MetaReducer<any>[] = !environment.production ? [logger] : [];
