import _ from "lodash";

// INITIAL STATE
import { initialState, IPlnasInitialState } from "../redux/store";

import {
  DOWNLOAD_PLANS_SUCCESS,
  CREATE_PLAN_SUCCESS,
  LOGOUT_USER,
  CREATE_TASK_SUCCESS,
  EDIT_PLAN_SUCCESS,
  REMOVE_PLAN_SUCCESS,
  REMOVE_TASK_SUCCESS
} from "../utils/constants";

// UTILS
import { savePlansLocal, clearPlansLocal } from "../utils/storage";
import { PlanActionType } from "../utils/types";

export default (
  state: IPlnasInitialState = initialState.plans,
  action: PlanActionType
) => {
  switch (action.type) {
    // PLAN ACTIONS
    case DOWNLOAD_PLANS_SUCCESS:
      if (_.isEqual(state, action.payload)) return state;

      state = action.payload;
      savePlansLocal(state);

      return [...state];
    case CREATE_PLAN_SUCCESS:
      state.push(action.payload);
      savePlansLocal(state);

      return [...state];
    case EDIT_PLAN_SUCCESS:
      state = state.map(plan =>
        plan._id === action.payload._id ? action.payload : plan
      );
      savePlansLocal(state);

      return [...state];
    case REMOVE_PLAN_SUCCESS:
      state = state.filter(plan => plan._id !== action.payload);
      savePlansLocal(state);

      return [...state];
    // TASKS ACTIONS
    case CREATE_TASK_SUCCESS:
      const currCreatePlan = state.filter(
        plan => plan._id === action.payload.id
      );

      if (currCreatePlan.length > 0) {
        currCreatePlan[0].tasks.push(action.payload.task._id);
        savePlansLocal(state);
      }

      return [...state];
    case REMOVE_TASK_SUCCESS:
      const currRemovePlan = state.filter(
        plan => plan._id === action.payload.planId
      );

      if (currRemovePlan.length > 0) {
        currRemovePlan[0].tasks = currRemovePlan[0].tasks.filter(task => task !== action.payload.taskId);
        savePlansLocal(state);
      }

      return [...state];

    // USER ACTIONS
    case LOGOUT_USER:
      state = [];

      clearPlansLocal();
      return [...state];
    default:
      return state;
  }
};
