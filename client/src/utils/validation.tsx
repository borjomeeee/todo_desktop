import { ERRORS } from "../enums";
import { initialStateInputsType } from "../screens/Auth/Auth.screen";

export const validLogin = (email: string, password: string) => {
  let errors = {
    email: "",
    password: ""
  };

  if (email.length === 0) errors.email = ERRORS.LENTGTH_ERROR;
  else if (
    !/^([a-zA-Z0-9_\-.]+)@([a-zA-Z0-9_\-.]+)\.([a-zA-Z]{2,5})$/.test(
      email
    )
  )
    errors.email = ERRORS.EMAIL_ERROR;

  if (password.length === 0)
    errors.password = ERRORS.LENTGTH_ERROR;
  else if (password.length < 6)
    errors.password = ERRORS.PASSWORD_ERROR;


  return errors;
};

export const validRegister = (data: initialStateInputsType) => {
  const { name, email, password, checkPassword } = data
  let errors = {
    name: "",
    checkPassword: ""
  };

  if (name.length === 0) errors.name = ERRORS.LENTGTH_ERROR;

  if (checkPassword.length === 0)
    errors.checkPassword = ERRORS.LENTGTH_ERROR;
  else if (checkPassword !== password)
    errors.checkPassword = ERRORS.CHECK_PASSWORD_ERROR;

  let loginErrors = validLogin(email, password);
  return { ...errors, ...loginErrors };
};

export const processServerError = (message: string) => {
  let errors: initialStateInputsType = {
    name: "",
    email: "",
    password: "",
    checkPassword: ""
  };

  switch (message) {
    case "[LOGIN] USER NOT EXIST!":
      errors.email = ERRORS.LOGIN_NOT_EXIST;
      break;
    case "[LOGIN] PASSWORD UNCORRECT!":
      errors.password = ERRORS.LOGIN_UNCORRECT_PASSWORD;
      break;
    case "[LOGIN] SERVER ERROR!":
      errors.email = ERRORS.LOGIN_COMMON;
      break;

    case "[REGISTER] USER IS EXIST!":
      errors.email = ERRORS.REGISTER_IS_EXIST;
      break;
    case "[REGISTER] SERVER ERROR!":
      errors.email = ERRORS.REGISTER_COMMON;
      break;
  };

  return errors;
};

export const checkValid = (errors: Object) => Object.values(errors).every(err => err.length === 0);