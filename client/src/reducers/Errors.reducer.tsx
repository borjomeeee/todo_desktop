import _ from "lodash";

// INITIAL STATE
import { initialState, IErrorsInitialState } from "../redux/store";

import {
  CLEAR_ALL_ERRORS,
  CLEAR_AUTH_ERROR,
  CLEAR_MAIN_ERROR,
  CLEAR_PLAN_ERROR,
  CLEAR_TASK_ERROR,
  LOGIN_USER_FAILED,
  REGISTER_USER_FAILED,
  DOWNLOAD_PLANS_FAILED,
  CREATE_PLAN_FAILED,
  DOWNLOAD_TASKS_FAILED,
  CREATE_TASK_FAILED,
  LOGIN_USER_SUCCESS,
  REGISTER_USER_SUCCESS,
  LOGOUT_USER,
  DOWNLOAD_PLANS_SUCCESS,
  CREATE_PLAN_SUCCESS,
  DOWNLOAD_TASKS_SUCCESS,
  CREATE_TASK_SUCCESS,
  REMOVE_PLAN_FAILED,
  REMOVE_PLAN_SUCCESS
} from "../utils/constants";

// UTILS
import { ErrorActionType } from "../utils/types";

export default (
  state: IErrorsInitialState = initialState.errors,
  action: ErrorActionType
): IErrorsInitialState => {
  switch (action.type) {
    // CLEAR ERROR ACTIONS
    case CLEAR_ALL_ERRORS:
    case LOGOUT_USER:
      state = {
        auth: "",
        main: "",
        plan: "",
        task: ""
      };

      return _.merge({}, state);
    case CLEAR_AUTH_ERROR:
    case LOGIN_USER_SUCCESS:
    case REGISTER_USER_SUCCESS:
      state.auth = "";

      return _.merge(state, {});
    case CLEAR_MAIN_ERROR:
      state.main = "";

      return _.merge(state, {});
    case CLEAR_PLAN_ERROR:
    case DOWNLOAD_PLANS_SUCCESS:
    case CREATE_PLAN_SUCCESS:
    case REMOVE_PLAN_SUCCESS:
      state.plan = "";

      return _.merge(state, {});
    case CLEAR_TASK_ERROR:
    case DOWNLOAD_TASKS_SUCCESS:
    case CREATE_TASK_SUCCESS:
      state.task = "";
      return _.merge(state, {});

    // USER ERROR ACTIONS
    case LOGIN_USER_FAILED:
    case REGISTER_USER_FAILED:
      state.auth = action.payload;
      return _.merge(state, {});

    // PLAN ERROR ACTIONS
    case DOWNLOAD_PLANS_FAILED:
    case CREATE_PLAN_FAILED:
    case REMOVE_PLAN_FAILED:
      state.plan = action.payload;
      return _.merge(state, {});

    // TASK ERROR ACTIONS
    case DOWNLOAD_TASKS_FAILED:
    case CREATE_TASK_FAILED:
      state.task = action.payload;
      return _.merge(state, {});
    default:
      return state;
  }
};
