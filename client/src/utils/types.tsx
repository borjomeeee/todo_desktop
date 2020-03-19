import {
  clearAllErrorsAction,
  clearAuthErrorAction,
  clearMainErrorAction,
  clearTaskErrorAction,
  clearPlanErrorAction
} from "../actions/Errors.actions";

import {
  loginUserSuccessAction,
  loginUserFailedAction,
  registerUserSuccessAction,
  loginUserAction,
  registerUserAction,
  registerUserFailedAction,
  logoutUserAction
} from "../actions/User.actions";

import {
  downloadPlansAction,
  downloadPlansSuccessAction,
  downloadPlansFailedAction,
  createPlanAction,
  createPlanSuccessAction,
  createPlanFailedAction,
  editPlanAction,
  editPlanSuccessAction,
  editPlanFailedAction,
  removePlanAction,
  removePlanSuccessAction,
  removePlanFailedAction
} from "../actions/Plans.actions";

import {
  createTaskAction,
  downloadTasksAction,
  downloadTasksSuccessAction,
  downloadTasksFailedAction,
  createTaskSuccessAction,
  createTaskFailedAction,
  editTaskAction,
  editTaskSuccessAction,
  editTaskFailedAction,
  removeTaskAction,
  removeTaskSuccessAction,
  removeTaskFailedAction
} from "../actions/Tasks.actions";

export type ErrorActionType =
  | ReturnType<typeof clearAllErrorsAction>
  | ReturnType<typeof clearAuthErrorAction>
  | ReturnType<typeof clearMainErrorAction>
  | ReturnType<typeof clearPlanErrorAction>
  | ReturnType<typeof clearTaskErrorAction>
  // USER ACTIONS
  | ReturnType<typeof loginUserFailedAction>
  | ReturnType<typeof loginUserSuccessAction>
  | ReturnType<typeof registerUserFailedAction>
  | ReturnType<typeof registerUserSuccessAction>
  | ReturnType<typeof logoutUserAction>
  // PLAN ACTIONS
  | ReturnType<typeof downloadPlansSuccessAction>
  | ReturnType<typeof downloadPlansFailedAction>
  | ReturnType<typeof createPlanSuccessAction>
  | ReturnType<typeof createPlanFailedAction>
  | ReturnType<typeof removePlanSuccessAction>
  | ReturnType<typeof removePlanFailedAction>
  // TASK ACTIONS
  | ReturnType<typeof downloadTasksSuccessAction>
  | ReturnType<typeof downloadTasksFailedAction>
  | ReturnType<typeof createTaskSuccessAction>
  | ReturnType<typeof createTaskFailedAction>
  | ReturnType<typeof removeTaskSuccessAction>
  | ReturnType<typeof removeTaskFailedAction>

export type UserActionType =
  | ReturnType<typeof loginUserAction>
  | ReturnType<typeof loginUserSuccessAction>
  | ReturnType<typeof loginUserFailedAction>
  | ReturnType<typeof registerUserAction>
  | ReturnType<typeof registerUserSuccessAction>
  | ReturnType<typeof registerUserFailedAction>
  | ReturnType<typeof logoutUserAction>
  // PLAN ACTIONS
  | ReturnType<typeof downloadPlansSuccessAction>
  | ReturnType<typeof downloadPlansFailedAction>
  | ReturnType<typeof createPlanSuccessAction>
  | ReturnType<typeof createPlanFailedAction>
  | ReturnType<typeof editPlanSuccessAction>
  | ReturnType<typeof editPlanFailedAction>
  | ReturnType<typeof removePlanSuccessAction>
  | ReturnType<typeof removePlanFailedAction>
  // TASK ACTIONS
  | ReturnType<typeof downloadTasksSuccessAction>
  | ReturnType<typeof downloadTasksFailedAction>
  | ReturnType<typeof createTaskSuccessAction>
  | ReturnType<typeof createTaskFailedAction>
  | ReturnType<typeof removeTaskSuccessAction>
  | ReturnType<typeof removeTaskFailedAction>

export type PlanActionType =
  // DOWNLOAD
  | ReturnType<typeof downloadPlansAction>
  | ReturnType<typeof downloadPlansSuccessAction>
  | ReturnType<typeof downloadPlansFailedAction>
  // CREATE
  | ReturnType<typeof createPlanAction>
  | ReturnType<typeof createPlanSuccessAction>
  | ReturnType<typeof createPlanFailedAction>
  // EDIT
  | ReturnType<typeof editPlanAction>
  | ReturnType<typeof editPlanSuccessAction>
  | ReturnType<typeof editPlanFailedAction>
  // REMOVE
  | ReturnType<typeof removePlanAction>
  | ReturnType<typeof removePlanSuccessAction>
  | ReturnType<typeof removePlanFailedAction>
  // USER ACTIONS
  | ReturnType<typeof logoutUserAction>
  // TASK ACTIONS
  | ReturnType<typeof downloadTasksSuccessAction>
  | ReturnType<typeof downloadTasksFailedAction>
  | ReturnType<typeof createTaskSuccessAction>
  | ReturnType<typeof createTaskFailedAction>
  | ReturnType<typeof removeTaskSuccessAction>
  | ReturnType<typeof removeTaskFailedAction>

export type TaskActionType =
  // DOWLOAD
  | ReturnType<typeof downloadTasksAction>
  | ReturnType<typeof downloadTasksSuccessAction>
  | ReturnType<typeof downloadTasksFailedAction>
  // CREATE
  | ReturnType<typeof createTaskAction>
  | ReturnType<typeof createTaskSuccessAction>
  | ReturnType<typeof createTaskFailedAction>
  // EDIT
  | ReturnType<typeof editTaskAction>
  | ReturnType<typeof editTaskSuccessAction>
  | ReturnType<typeof editTaskFailedAction>
  // REMOVE
  | ReturnType<typeof removeTaskAction>
  | ReturnType<typeof removeTaskSuccessAction>
  | ReturnType<typeof removeTaskFailedAction>
  // PLAN ACTIONS
  | ReturnType<typeof removePlanSuccessAction>
  | ReturnType<typeof removePlanFailedAction>
  // USER ACTIONS
  | ReturnType<typeof logoutUserAction>;
