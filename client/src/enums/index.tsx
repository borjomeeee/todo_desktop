export enum ERRORS {
  // VALIDATION ERRORS
  LENTGTH_ERROR = "Поле не должно быть пустым",
  EMAIL_ERROR = "Введите правильный email",
  PASSWORD_ERROR = "Минимальная длина пароля - 6 символов",
  CHECK_PASSWORD_ERROR = "Пароли не совпадают",

  // SERVER ERRORS
  LOGIN_NOT_EXIST = "Пользователя не существует",
  LOGIN_UNCORRECT_PASSWORD = "Неверный пароль",
  LOGIN_COMMON = "Ошибка входа",

  REGISTER_IS_EXIST = "Такой пользователь уже сущестует",
  REGISTER_COMMON = "Ошибка регистрации",

  // AUTH ERRORS
  NOT_AUTH = "[AUTH] NOT AUTH!"
}

export enum LOADING {
  LOADING_STAY,
  LOADING_PROCESS,
  LOADING_SUCCESS,
  LOADING_FAILED
}