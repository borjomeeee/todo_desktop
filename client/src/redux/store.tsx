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

// MODELS
import { User } from "../models/User.model";
import { Plan } from "../models/Plan.model";
import { Task } from "../models/Task.model";

// ENUMS
import { LOADING } from "../enums";

// TYPES
export type IPlnasInitialState = Plan[];
export type ITasksInitialState = Task[];

// INITIAL STATE
export const initialState = {
  loading: LOADING.LOADING_STAY,
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
export type ILoadingInitialState = LOADING;
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
