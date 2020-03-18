import { put, takeLeading } from "redux-saga/effects";

// ACTIONS TYPES
import { LOGIN_USER, REGISTER_USER } from "../utils/constants";

// ACTIONS
import {
  loginUserFailedAction,
  loginUserSuccessAction,
  registerUserFailedAction,
  registerUserSuccessAction,
  ILoginSaga,
  IRegisterSaga,
} from "../actions/User.actions";
import { User } from "../models/User.model";

function* loginSaga({ payload }: ILoginSaga) {
  try {
    const response = yield fetch("/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=utf-8"
      },
      body: JSON.stringify(payload)
    });

    let data = yield response.json();
    if (!response.ok) return yield put(loginUserFailedAction(data.message));

    const user = new User({ token: data.token, ...data.user });
    yield put(loginUserSuccessAction(user));
  } catch (e) {
    yield put(loginUserFailedAction(e.message));
  }
}

function* registerSaga({ payload }: IRegisterSaga) {
  try {
    let response = yield fetch("/auth/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=utf-8"
      },
      body: JSON.stringify(payload)
    });

    let data = yield response.json();
    if (!response.ok) return yield put(registerUserFailedAction(data.message));

    const user = new User({ token: data.token, ...data.user });
    yield put(registerUserSuccessAction(user));
  } catch (e) {
    yield put(registerUserFailedAction(e.message));
  }
}

export default function* authSaga() {
  yield takeLeading(LOGIN_USER, loginSaga);
  yield takeLeading(REGISTER_USER, registerSaga);
}
