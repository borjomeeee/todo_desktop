import React, { useState, useEffect } from "react";
import { connect } from "react-redux";

// STYLES
import "./Auth.screen.scss";

// ACTIONS
import {
  loginUserAction,
  registerUserAction
} from "../../actions/User.actions";

// UTILS
import {
  processServerError,
  validRegister,
  validLogin,
  checkValid
} from "../../utils/validation";
import { ArrowBackIcon } from "../../utils/icons";

export type initialStateInputsType = {
  name: string;
  email: string;
  password: string;
  checkPassword: string;
};

const initialStateInputs: initialStateInputsType = {
  name: "",
  email: "",
  password: "",
  checkPassword: ""
};

export interface IAuthScreen {
  error: string;

  login: (email: string, password: string) => {};
  register: (name: string, email: string, password: string) => {};
}

const AuthScreen: React.FC<IAuthScreen> = ({ error, login, register }) => {
  const { isLogin, togglePage, serverError } = usePageState(error);
  const {
    inputsValues,
    changeInputValue,
    clearInputsValues
  } = useInputsValues();
  const {
    inputsErrors,
    changeInputError,
    clearInputsErrors
  } = useInputsErrors();

  const changeInputValueHandler = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    changeInputValue(event.target.name, event.target.value);
  };

  // TOGGLE AUTH PAGES
  const togglePageHandler = (event: React.MouseEvent) => {
    event.preventDefault();

    clearInputsValues();
    clearInputsErrors();

    togglePage();
  };

  // FORM ACTIONS
  const loginHandler = async (event: React.MouseEvent) => {
    event.preventDefault();

    const errors = validLogin(inputsValues.email, inputsValues.password);
    if (checkValid(errors)) {
      login(inputsValues.email, inputsValues.password);
    } else changeInputError(errors);
  };

  const registerHandler = async (event: React.MouseEvent) => {
    event.preventDefault();

    const errors = validRegister(inputsValues);

    if (checkValid(errors)) {
      register(inputsValues.name, inputsValues.email, inputsValues.password);
    } else changeInputError(errors);
  };

  return (
    <div className="auth">
      <div className="auth__title">Добро пожаловать!</div>

      <div className="auth__form">
        <div className="form">
          {isLogin ? (
            <></>
          ) : (
            <div className="form__back" onClick={togglePageHandler}>
              <ArrowBackIcon width={30} height={30} fill={"#000"} />
            </div>
          )}

          <div className="form__title">{isLogin ? "Вход" : "Регистрация"}</div>

          <div className="form__block">
            <div
              className={`form__option ${isLogin ? "form__option-hidden" : ""}`}
            >
              <label htmlFor="name" className="form__label">
                Имя
              </label>

              <input
                id="name"
                type="text"
                name="name"
                className="form__input"
                value={inputsValues.name}
                onChange={changeInputValueHandler}
                autoFocus={!isLogin}
              />
              <span className="form__error">{inputsErrors.name}</span>
            </div>

            <div className="form__option">
              <label htmlFor="email" className="form__label">
                Почта
              </label>

              <input
                id="email"
                type="email"
                name="email"
                className="form__input"
                value={inputsValues.email}
                onChange={changeInputValueHandler}
                autoFocus={isLogin}
              />
              <span className="form__error">
                {inputsErrors.email || serverError.email}
              </span>
            </div>

            <div className="form__option">
              <label htmlFor="password" className="form__label">
                Пароль
              </label>

              <input
                id="password"
                type="password"
                name="password"
                className="form__input"
                value={inputsValues.password}
                onChange={changeInputValueHandler}
              />
              <span className="form__error">
                {inputsErrors.password || serverError.password}
              </span>
            </div>

            <div
              className={`form__option ${isLogin ? "form__option-hidden" : ""}`}
            >
              <label htmlFor="check-password" className="form__label">
                Повторите пароль
              </label>

              <input
                id="check-password"
                type="password"
                name="checkPassword"
                className="form__input"
                value={inputsValues.checkPassword}
                onChange={changeInputValueHandler}
              />
              <span className="form__error">{inputsErrors.checkPassword}</span>
            </div>
          </div>

          <div className="form__buttons">
            {isLogin ? (
              <button className="form__button" onClick={loginHandler}>
                Войти
              </button>
            ) : (
              <></>
            )}

            <button
              className="form__button form__button-active"
              onClick={isLogin ? togglePageHandler : registerHandler}
            >
              {isLogin ? "Регистрация" : "Создать"}
            </button>
          </div>
{/* 
          <div className="form__google-sign">
            <div> Google Icon! </div>
          </div> */}
        </div>
      </div>
    </div>
  );
};

const useInputsValues = () => {
  const [inputsValues, setInputsValues] = useState<initialStateInputsType>(
    initialStateInputs
  );

  const clearInputsValues = () => {
    setInputsValues(initialStateInputs);
  };

  const changeInputValue = (title: string, text: string) => {
    setInputsValues({
      ...inputsValues,
      [title]: text
    });
  };

  return { inputsValues, clearInputsValues, changeInputValue };
};

const useInputsErrors = () => {
  const [inputsErrors, setInputsErrors] = useState<initialStateInputsType>(
    initialStateInputs
  );

  const clearInputsErrors = () => {
    setInputsErrors(initialStateInputs);
  };

  const changeInputError = (errors: Object) => {
    setInputsErrors({
      ...inputsErrors,
      ...errors
    });
  };

  return { inputsErrors, clearInputsErrors, changeInputError };
};

const usePageState = (error: string) => {
  const [isLogin, setIsLogin] = useState(true);
  const [serverError, setServerError] = useState<initialStateInputsType>(
    initialStateInputs
  );

  useEffect(() => {
    setServerError(processServerError(error));
  }, [error]);

  const togglePage = () => {
    setIsLogin(!isLogin);
  };

  return { serverError, setServerError, isLogin, togglePage };
};

// REDUX STORE
const mapStateToProps = (state: any) => ({
  error: state.errors.auth
});

const mapDispatchToProps = (dispatch: any) => ({
  login: (email: string, password: string) =>
    dispatch(loginUserAction(email, password)),
  register: (name: string, email: string, password: string) =>
    dispatch(registerUserAction(name, email, password))
});

export default connect(mapStateToProps, mapDispatchToProps)(AuthScreen);
