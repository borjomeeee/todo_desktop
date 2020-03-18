import { put, takeEvery } from "redux-saga/effects";

// ACTIONS TYPES
import { DOWNLOAD_TASKS, CREATE_TASK, EDIT_TASK } from "../utils/constants";

// ACTIONS
import {
  IDownloadTasksSaga,
  downloadTasksFailedAction,
  downloadTasksSuccessAction,
  ICreateTasksSaga,
  createTaskFailedAction,
  createTaskSuccessAction,
  IEditTaskSaga,
  editTaskFailedAction,
  editTaskSuccessAction
} from "../actions/Tasks.actions";

// MODELS
import { Task } from "../models/Task.model";

function* downloadTasksSaga({ payload }: IDownloadTasksSaga) {
  try {
    const response = yield fetch("/tasks/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
        auth: payload.token,
      }
    });

    let data = yield response.json();
    if (!response.ok) return yield put(downloadTasksFailedAction(data.message));

    const tasks = data.map(
      (task: any) =>
        new Task({ ...task })
    );

    yield put(downloadTasksSuccessAction(tasks));
  } catch (e) {
    yield put(downloadTasksFailedAction(e.message));
  }
}

function* createTaskSaga({ payload }: ICreateTasksSaga) {
  try {
    const response = yield fetch("/tasks/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
        auth: payload.token
      },
      body: JSON.stringify({
        planId: payload.planId,
        title: payload.title
      })
    });
  
    let data = yield response.json();
    if (!response.ok) return yield put(createTaskFailedAction(data.message));
  
    let task = new Task({ ...data });
  
    yield put(createTaskSuccessAction(payload.planId, task));
  } catch(e) {
    yield put(createTaskFailedAction(e.message));
  }
}

function* editTaskSaga({ payload }: IEditTaskSaga) {
  try {
    const response = yield fetch(`/tasks/${payload.task._id}/edit`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
        auth: payload.token
      },
      body: JSON.stringify({
        planId: payload.planId,
        text: payload.task.text,
        checked: payload.task.checked
      })
    });
  
    let data = yield response.json();
    if (!response.ok) return yield put(editTaskFailedAction(data.message));
  
    let task = new Task({ ...data });
  
    yield put(editTaskSuccessAction(task));
  } catch(e) {
    yield put(editTaskFailedAction(e.message));
  }
}

export default function* tasksSaga() {
  yield takeEvery(DOWNLOAD_TASKS, downloadTasksSaga);
  yield takeEvery(CREATE_TASK, createTaskSaga);
  yield takeEvery(EDIT_TASK, editTaskSaga)
}
