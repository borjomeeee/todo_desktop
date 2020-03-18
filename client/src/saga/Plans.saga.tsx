import { put, takeEvery } from "redux-saga/effects";

// ACTIONS TYPES
import { DOWNLOAD_PLANS, CREATE_PLAN, EDIT_PLAN } from "../utils/constants";

// ACTIONS
import {
  IDownloadPlansSaga,
  ICreatePlanSaga,
  downloadPlansFailedAction,
  downloadPlansSuccessAction,
  createPlanSuccessAction,
  createPlanFailedAction,
  IEditPlanSaga,
  editPlanFailedAction,
  editPlanSuccessAction
} from "../actions/Plans.actions";

import { Plan } from "../models/Plan.model";

function* downloadPlansSaga({ payload }: IDownloadPlansSaga) {
  try {
    const response = yield fetch("/plans/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
        auth: payload.token
      }
    });

    let data = yield response.json();
    if (!response.ok) return yield put(downloadPlansFailedAction(data.message));

    const plans = data.map((plan: any) => new Plan({ ...plan }));
    yield put(downloadPlansSuccessAction(plans));
  } catch (e) {
    yield put(downloadPlansFailedAction(e.message));
  }
}

function* createPlanSaga({ payload }: ICreatePlanSaga) {
  try {
    const response = yield fetch("/plans/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
        auth: payload.token
      },
      body: JSON.stringify({
        userId: payload.userId,
        title: payload.title,
        date: payload.date
      })
    });

    const data = yield response.json();
    if (!response.ok) return yield put(createPlanFailedAction(data.message));

    let plan = new Plan({ ...data });
    yield put(createPlanSuccessAction(plan));
  } catch (e) {
    yield put(createPlanFailedAction(e.message));
  }
}

function* editPlanSaga({ payload }: IEditPlanSaga) {
  try {
    const response = yield fetch(`/plans/${payload.plan._id}/edit`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
        auth: payload.token
      },
      body: JSON.stringify({
        id: payload.plan._id,
        title: payload.plan.title,
        date: payload.plan.date
      })
    });

    const data = yield response.json();
    if (!response.ok) return yield put(editPlanFailedAction(data.message));

    let plan = new Plan({ ...data });
    yield put(editPlanSuccessAction(plan));
  } catch (e) {
    yield put(editPlanFailedAction(e.message));
  }
}

export default function* plansSaga() {
  yield takeEvery(DOWNLOAD_PLANS, downloadPlansSaga);
  yield takeEvery(CREATE_PLAN, createPlanSaga);
  yield takeEvery(EDIT_PLAN, editPlanSaga);
}
