import { all } from "redux-saga/effects";

// SAGAS
import UserSaga from './User.saga';
import PlansSaga from "./Plans.saga";
import TasksSaga from './Tasks.saga';

export default function* rootSaga() {
  yield all([
    UserSaga(),
    PlansSaga(),
    TasksSaga()
  ]);
};