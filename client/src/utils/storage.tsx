import { Plan } from "../models/Plan.model";
import { User } from "../models/User.model";
import { Task } from "../models/Task.model";

// USER
export const saveUserLocal = (user: User) => {
  localStorage.setItem('userAuth', JSON.stringify(user));
};
export const clearUserLocal = () => localStorage.removeItem('userAuth');
export const getUserLocal = () => localStorage.getItem('userAuth');

// PLANS
export const savePlansLocal = (plans: Plan[]) => {
  localStorage.setItem('userPlans', JSON.stringify(plans));
}
export const clearPlansLocal = () => localStorage.removeItem('userPlans');
export const getPlansLocal = () => localStorage.getItem('userPlans');

// TASKS
export const saveTasksLocal = (plans: Task[]) => {
  localStorage.setItem('userTasks', JSON.stringify(plans));
}
export const clearTasksLocal = () => localStorage.removeItem('userTasks');
export const getTasksLocal = () => localStorage.getItem('userTasks');