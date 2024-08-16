/* eslint-disable @typescript-eslint/no-explicit-any */
import { call, put, takeLatest } from "redux-saga/effects";
import { getSession, setSession } from "../../redux/reducers/sessionSlice";
import {
  fetchSession,
  requestValidateSession,
} from "../../requests/sessionClient";

import { AxiosResponse } from "axios";
import { isTimeExpires, removeSearchQueriesFromURL } from "../../util";
import {
  postMessageActions,
  sendHideLoader,
  sendMessage,
  sendShowLoader,
} from "../../requests/postMessageClient";
import { SessionStatus } from "../../type/session.definition";
import {
  setSessionStatus,
  validateSession,
} from "../../redux/reducers/validateSessionSlice";

export function* handleValidateSession({ payload }: any) {
  try {
    yield call(sendShowLoader);
    const response: AxiosResponse = yield call(requestValidateSession, payload);

    if (isTimeExpires(response?.data?.expiresAt)) {
      yield put(setSessionStatus(SessionStatus.INVALID_SESSION));
      yield call(sendMessage, { action: postMessageActions.SESSION_INVALID });
    } else {
      yield call(handleGetSession);
      yield put(setSessionStatus(SessionStatus.VALID_SESSION));
      yield removeSearchQueriesFromURL();
    }
  } catch (error: any) {
    yield put(setSessionStatus(SessionStatus.INVALID_SESSION));
    yield call(sendMessage, { action: postMessageActions.SESSION_INVALID });
    yield call(sendMessage, {
      action: postMessageActions.ERROR,
      payload: error,
    });
  }
}

export function* handleGetSession() {
  try {
    yield call(sendShowLoader);
    const response: AxiosResponse = yield call(fetchSession);
    yield put(setSession(response.data));
  } catch (error: unknown) {
    yield call(sendHideLoader);
    yield call(sendMessage, {
      action: postMessageActions.ERROR,
      payload: { error },
    });
  }
}

export function* watchValidateSession() {
  yield takeLatest(validateSession.type, handleValidateSession);
}

export function* watchGetSession() {
  yield takeLatest(getSession.type, handleGetSession);
}
