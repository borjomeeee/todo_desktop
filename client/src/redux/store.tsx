import { combineReducers, createStore, applyMiddleware } from "redux";
import createSagaMiddleware from "redux-saga";
import { composeWithDevTools } from "redux-devtools-extension";

// REDUCERS
import UserReducer from "../reducers/User.reducer";
import ErrorsReducer from '../reducers/Errors.reducer';
import PlansReducer from "../reducers/Plans.reducer";
import TasksReducer from '../reducers/Tasks.reducer';

// ROOT SAGA
import RootSaga from "../saga/Root.saga";
import { User } from "../models/User.model";
import { Plan } from "../models/Plan.model";
import { Task } from "../models/Task.model";

// TYPES
export type IPlnasInitialState = Plan[];
export type ITasksInitialState = Task[];

// INITIAL STATE
export const initialState = {
  errors: {
    auth: "",
    main: "",
    plan: "",
    task: ""
  },
  user: new User(),
  plans: [],
  tasks: []
}

// TYPES
export type IErrorsInitialState = typeof initialState.errors;
export type IUserInitialState = typeof initialState.user;


const reducers = combineReducers({
  user: UserReducer,
  errors: ErrorsReducer,
  plans: PlansReducer,
  tasks: TasksReducer
});

const sagaMiddleware = createSagaMiddleware();
export const store = createStore(
  reducers,
  composeWithDevTools(applyMiddleware(sagaMiddleware))
);

sagaMiddleware.run(RootSaga);
