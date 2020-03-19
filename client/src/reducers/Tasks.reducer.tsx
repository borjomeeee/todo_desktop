// INITIAL STATE
import { initialState, ITasksInitialState } from "../redux/store";

import {
  CREATE_TASK_SUCCESS,
  DOWNLOAD_TASKS_SUCCESS,
  LOGOUT_USER,
  EDIT_TASK_SUCCESS,
  REMOVE_TASK_SUCCESS,
  REMOVE_PLAN_SUCCESS
} from "../utils/constants";

// UTILS
import { TaskActionType } from "../utils/types";
import { saveTasksLocal, clearTasksLocal } from "../utils/storage";

export default (
  state: ITasksInitialState = initialState.tasks,
  action: TaskActionType
): ITasksInitialState => {
  switch (action.type) {
    // TASK ACTIONS
    case DOWNLOAD_TASKS_SUCCESS:
      state = action.payload.tasks;

      saveTasksLocal(state);
      return [...state];
    case CREATE_TASK_SUCCESS:
      state.push(action.payload.task);

      saveTasksLocal(state);
      return [...state];
    case EDIT_TASK_SUCCESS:
      state = state.map(task => task._id === action.payload._id ? action.payload : task);

      saveTasksLocal(state);
      return [...state];
    case REMOVE_TASK_SUCCESS:
      state = state.filter(task => task._id !== action.payload.taskId);

      saveTasksLocal(state);
      return [...state];

    // PLAN ACTIONS
    case REMOVE_PLAN_SUCCESS:
      state = state.filter(task => task.planId !== action.payload);
      
      saveTasksLocal(state);
      return [...state];
      
    // USER ACTIONS
    case LOGOUT_USER:
      state = [];

      clearTasksLocal();
      return [ ...state ];
    default:
      return state;
  }
};
