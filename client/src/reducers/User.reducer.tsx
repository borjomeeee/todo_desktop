import {
  LOGIN_USER_SUCCESS,
  REGISTER_USER_SUCCESS,
  LOGOUT_USER,
  DOWNLOAD_PLANS_SUCCESS,
  CREATE_PLAN_SUCCESS,
  DOWNLOAD_PLANS_FAILED,
  DOWNLOAD_TASKS_FAILED,
} from "../utils/constants";

import { User } from "../models/User.model";

import { saveUserLocal, clearUserLocal } from "../utils/storage";
import { UserActionType } from "../utils/types";

import { initialState, IUserInitialState } from "../redux/store";
import { ERRORS } from "../enums";

export default (
  state: IUserInitialState = initialState.user,
  action: UserActionType
): IUserInitialState => {
  switch (action.type) {
    // AUTH USER CASES
    case LOGIN_USER_SUCCESS:
    case REGISTER_USER_SUCCESS:
      state = new User({ ...action.payload });
      state.login();

      saveUserLocal(state);
      return state;
    case LOGOUT_USER:
      state.logout();

      clearUserLocal();
      return new User({ ...state })

    // AUTH FAILED ACTIONS
    case DOWNLOAD_PLANS_FAILED:
    case DOWNLOAD_TASKS_FAILED:
      if (action.payload !== ERRORS.NOT_AUTH)
        return state;

      state.logout();

      clearUserLocal();
      return new User({ ...state })

    // PLAN ACTIONS
    case DOWNLOAD_PLANS_SUCCESS:
      state.plans = action.payload.map(plan => plan._id);
      return new User({ ...state })
    case CREATE_PLAN_SUCCESS:
      state.plans.push(action.payload._id);
      return new User({ ...state })
    default:
      return state;
  }
};
