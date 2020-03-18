import {
  CLEAR_ALL_ERRORS,
  CLEAR_AUTH_ERROR,
  CLEAR_MAIN_ERROR,
  CLEAR_PLAN_ERROR,
  CLEAR_TASK_ERROR
} from "../utils/constants";

export const clearAllErrorsAction = () =>
  ({
    type: CLEAR_ALL_ERRORS
  } as const);

export const clearAuthErrorAction = () =>
  ({
    type: CLEAR_AUTH_ERROR
  } as const);

export const clearMainErrorAction = () =>
  ({
    type: CLEAR_MAIN_ERROR
  } as const);

export const clearPlanErrorAction = () =>
  ({
    type: CLEAR_PLAN_ERROR
  } as const);

export const clearTaskErrorAction = () =>
  ({
    type: CLEAR_TASK_ERROR
  } as const);