import {
  DOWNLOAD_TASKS,
  DOWNLOAD_TASKS_SUCCESS,
  DOWNLOAD_TASKS_FAILED,
  CREATE_TASK,
  CREATE_TASK_SUCCESS,
  CREATE_TASK_FAILED,
  EDIT_TASK,
  EDIT_TASK_SUCCESS,
  EDIT_TASK_FAILED,
  REMOVE_TASK,
  REMOVE_TASK_SUCCESS,
  REMOVE_TASK_FAILED
} from "../utils/constants";

import { IAction } from "../utils/constants";

// MODELS
import { Task } from "../models/Task.model";

// ACTIONS TYPES
export interface IDownloadTasksSaga extends IAction {
  payload: { token: string };
}

export interface ICreateTasksSaga extends IAction {
  payload: { token: string; planId: string; title: string };
}

export interface IEditTaskSaga extends IAction {
  payload: { token: string; planId: string; task: Task };
}

export interface IRemoveTaskSaga extends IAction {
  payload: { token: string; planId: string; taskId: string };
}

// DOWNLOAD TASKS
export const downloadTasksAction = (token: string) =>
  ({
    type: DOWNLOAD_TASKS,
    payload: { token }
  } as const);

export const downloadTasksSuccessAction = (tasks: Task[]) =>
  ({
    type: DOWNLOAD_TASKS_SUCCESS,
    payload: { tasks }
  } as const);

export const downloadTasksFailedAction = (message: string) =>
  ({
    type: DOWNLOAD_TASKS_FAILED,
    payload: message
  } as const);

// CREAET TASK
export const createTaskAction = (
  token: string,
  planId: string,
  title: string
) =>
  ({
    type: CREATE_TASK,
    payload: { token, planId, title }
  } as const);

export const createTaskSuccessAction = (id: string, task: Task) =>
  ({
    type: CREATE_TASK_SUCCESS,
    payload: { id, task }
  } as const);

export const createTaskFailedAction = (message: string) =>
  ({
    type: CREATE_TASK_FAILED,
    payload: message
  } as const);

// EDIT TASK
export const editTaskAction = (token: string, planId: string, task: Task) =>
  ({
    type: EDIT_TASK,
    payload: { token, planId, task }
  } as const);

export const editTaskSuccessAction = (task: Task) =>
  ({
    type: EDIT_TASK_SUCCESS,
    payload: task
  } as const);

export const editTaskFailedAction = (message: string) =>
  ({
    type: EDIT_TASK_FAILED,
    payload: message
  } as const);

// REMOVE TASK
export const removeTaskAction = (
  token: string,
  planId: string,
  taskId: string
) =>
  ({
    type: REMOVE_TASK,
    payload: { token, planId, taskId }
  } as const);

export const removeTaskSuccessAction = (taskId: string) =>
  ({
    type: REMOVE_TASK_SUCCESS,
    payload: taskId
  } as const);

export const removeTaskFailedAction = (message: string) =>
  ({
    type: REMOVE_TASK_FAILED,
    payload: message
  } as const);
