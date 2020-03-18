import _ from "lodash";

// INITIAL STATE
import { initialState, IPlnasInitialState } from "../redux/store";

import {
  DOWNLOAD_PLANS_SUCCESS,
  CREATE_PLAN_SUCCESS,
  LOGOUT_USER,
  CREATE_TASK_SUCCESS,
  EDIT_PLAN_SUCCESS
} from "../utils/constants";

// UTILS
import { savePlansLocal } from "../utils/storage";
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
      state.map(plan =>
        plan._id === action.payload._id ? action.payload : plan
      );
      return [...state];

    // USER ACTIONS
    case LOGOUT_USER:
      state = [];

      return [...state];

    case CREATE_TASK_SUCCESS:
      const currCreatePlan = state.filter(
        plan => plan._id === action.payload.id
      );

      if (currCreatePlan.length > 0)
        currCreatePlan[0].tasks.push(action.payload.task._id);

      return [...state];
    default:
      return state;
  }
};
