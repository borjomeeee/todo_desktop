import React, { useEffect } from "react";
import { connect } from "react-redux";

// NAVIGATORS
import MainNavigator from "./Main.navigator";
import AuthNavigator from "./Auth.navigator";

// MODELS
import { Plan, IPlan } from "../models/Plan.model";
import { Task, ITask } from "../models/Task.model";
import { User } from "../models/User.model";

// UTILS
import { getUserLocal, getPlansLocal, getTasksLocal } from "../utils/storage";

// ACTIONS
import {
  downloadPlansSuccessAction,
  downloadPlansAction
} from "../actions/Plans.actions";

import {
  loginUserSuccessAction,
  logoutUserAction
} from "../actions/User.actions";

import {
  downloadTasksAction,
  downloadTasksSuccessAction
} from "../actions/Tasks.actions";
import { LOADING } from "../enums";
import CommonLoadingBar from "../components/CommonLoadingBar";

interface IAppNavigator {
  token: string;
  isAuth: boolean;

  login: (user: User) => {};

  savePlans: (plans: Plan[]) => {};
  saveTasks: (tasks: Task[]) => {};

  downloadPlans: (token: string) => {};
  downloadTasks: (token: string) => {};

  loading: LOADING;
}

const AppNavigator: React.FC<IAppNavigator> = ({
  token,
  isAuth,
  login,
  savePlans,
  saveTasks,
  downloadPlans,
  downloadTasks,
  loading
}) => {
  // Проверка если пользователь не авторизован
  useEffect(() => {
    if (!isAuth) {
      // Проверить есть ли данные в localStorage
      // Если есть, то залогинить пользователя
      const userData = getUserLocal();

      if (userData) {
        const getUser = JSON.parse(userData);
        const user = new User({ ...getUser });

        login(user);
      }
    }
  }, [login, isAuth]);

  // Если пользователь залогинился
  // Скачать планы с бд
  useEffect(() => {
    if (isAuth) {
      downloadPlans(token);
    } else {
      // Проверить есть ли данные в localStorage
      // Если есть, то скачать планы
      const plansData = getPlansLocal();

      if (plansData) {
        const plans = JSON.parse(plansData);
        savePlans(plans.map((plan: IPlan) => new Plan({ ...plan })));
      }
    }
  }, [isAuth, downloadPlans, token, savePlans]);

  // Если пользователь залогинился
  // Скачать планы с бд
  useEffect(() => {
    if (isAuth) {
      downloadTasks(token);
    } else {
      // Проверить есть ли данные в localStorage
      // Если есть, то скачать таски
      const tasksData = getTasksLocal();

      if (tasksData) {
        const tasks = JSON.parse(tasksData);
        saveTasks(tasks.map((task: ITask) => new Task({ ...task })));
      }
    }
  }, [isAuth, token, downloadTasks, saveTasks]);

  return (
    <>
      <CommonLoadingBar loading={loading} />
      
      {isAuth ? <MainNavigator /> : <AuthNavigator />}
    </>
  );
};

const mapStateToProps = (state: any) => ({
  token: state.user.token,
  isAuth: state.user.isAuth,
  plansId: state.user.plans,
  error: state.errors.plan,
  loading: state.loading
});

const mapDispatchToProps = (dispatch: any) => ({
  login: (user: User) => dispatch(loginUserSuccessAction(user)),
  logout: () => dispatch(logoutUserAction()),
  savePlans: (plans: Plan[]) => dispatch(downloadPlansSuccessAction(plans)),
  saveTasks: (tasks: Task[]) => dispatch(downloadTasksSuccessAction(tasks)),
  downloadPlans: (token: string) => dispatch(downloadPlansAction(token)),
  downloadTasks: (token: string) => dispatch(downloadTasksAction(token))
});

export default connect(mapStateToProps, mapDispatchToProps)(AppNavigator);
