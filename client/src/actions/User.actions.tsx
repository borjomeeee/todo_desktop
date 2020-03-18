import {
  LOGIN_USER,
  LOGIN_USER_SUCCESS,
  LOGIN_USER_FAILED,
  REGISTER_USER,
  REGISTER_USER_SUCCESS,
  REGISTER_USER_FAILED,
  LOGOUT_USER,
  CREATE_USER
} from "../utils/constants";

import { IAction } from "../utils/constants";
import { User } from "../models/User.model";

// ACTIONS TYPES
export interface ILoginSaga extends IAction {
  payload: { email: string; password: string };
}

export interface IRegisterSaga extends IAction {
  payload: { name: string; email: string; password: string };
}

// LOGIN ACTIONS
export const loginUserAction = (email: string, password: string) =>
  ({
    type: LOGIN_USER,
    payload: { email, password }
  } as const);

export const loginUserSuccessAction = (user: User) =>
  ({
    type: LOGIN_USER_SUCCESS,
    payload: user
  } as const);

export const loginUserFailedAction = (error: string) =>
  ({
    type: LOGIN_USER_FAILED,
    payload: error
  } as const);

// REGISTER ACTIONS
export const registerUserAction = (
  name: string,
  email: string,
  password: string
) =>
  ({
    type: REGISTER_USER,
    payload: { name, email, password }
  } as const);

export const registerUserSuccessAction = (user: User) =>
  ({
    type: REGISTER_USER_SUCCESS,
    payload: user
  } as const);

export const registerUserFailedAction = (error: string) =>
  ({
    type: REGISTER_USER_FAILED,
    payload: error
  } as const);

// LOGOUT ACTION
export const logoutUserAction = () =>
  ({
    type: LOGOUT_USER
  } as const);

// SAVE DATA USER
export const createUserAction = (user: User) =>
  ({
    type: CREATE_USER,
    payload: { user }
  } as const);
