import {
  DOWNLOAD_PLANS,
  DOWNLOAD_PLANS_SUCCESS,
  DOWNLOAD_PLANS_FAILED,
  CREATE_PLAN,
  CREATE_PLAN_SUCCESS,
  CREATE_PLAN_FAILED,
  EDIT_PLAN,
  EDIT_PLAN_SUCCESS,
  EDIT_PLAN_FAILED
} from "../utils/constants";

import { IAction } from "../utils/constants";

// MODELS
import { Plan } from "../models/Plan.model";

// ACTIONS TYPES
export interface IDownloadPlansSaga extends IAction {
  payload: { token: string };
}

export interface ICreatePlanSaga extends IAction {
  payload: { token: string; userId: string; title: string; date: number };
}

export interface IEditPlanSaga extends IAction {
  payload: { token: string, plan: Plan }
}

// DOWNLOAD PLANS
export const downloadPlansAction = (token: string) =>
  ({
    type: DOWNLOAD_PLANS,
    payload: { token }
  } as const);

export const downloadPlansSuccessAction = (plans: Plan[]) =>
  ({
    type: DOWNLOAD_PLANS_SUCCESS,
    payload: plans
  } as const);

export const downloadPlansFailedAction = (error: string) =>
  ({
    type: DOWNLOAD_PLANS_FAILED,
    payload: error
  } as const);

// CREATE PLANS
export const createPlanAction = (
  token: string,
  userId: string,
  title: string,
  date: number
) =>
  ({
    type: CREATE_PLAN,
    payload: { token, userId, title, date }
  } as const);

export const createPlanSuccessAction = (plan: Plan) =>
  ({
    type: CREATE_PLAN_SUCCESS,
    payload: plan
  } as const);

export const createPlanFailedAction = (error: string) =>
  ({
    type: CREATE_PLAN_FAILED,
    payload: error
  } as const);

// SAVE PLAN
export const editPlanAction = (token: string, plan: Plan) =>
  ({
    type: EDIT_PLAN,
    payload: { token, plan }
  } as const);

export const editPlanSuccessAction = (plan: Plan) =>
  ({
    type: EDIT_PLAN_SUCCESS,
    payload: plan
  } as const);

export const editPlanFailedAction = (message: string) =>
  ({
    type: EDIT_PLAN_FAILED,
    payload: message
  } as const);
