// INITIAL STATE
import { initialState, ITasksInitialState } from "../redux/store";

import {
  CREATE_TASK_SUCCESS,
  DOWNLOAD_TASKS_SUCCESS,
  LOGOUT_USER,
  EDIT_TASK_SUCCESS
} from "../utils/constants";

// UTILS
import { TaskActionType } from "../utils/types";

export default (
  state: ITasksInitialState = initialState.tasks,
  action: TaskActionType
): ITasksInitialState => {
  switch (action.type) {
    // TASK ACTIONS
    case DOWNLOAD_TASKS_SUCCESS:
      state = action.payload.tasks;

      return [...state];
    case CREATE_TASK_SUCCESS:
      state.push(action.payload.task);

      return [...state];
    case EDIT_TASK_SUCCESS:
      state.map(task => task._id === action.payload._id ? action.payload : task);
      return [...state];
      
    // USER ACTIONS
    case LOGOUT_USER:
      state = [];

      return [ ...state ];
    default:
      return state;
  }
};
