import { call, put, takeLatest } from "redux-saga/effects";
import { setSession } from "../../redux/reducers/sessionSlice";
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
import { hideLoader, showLoader } from "../../redux/reducers/loaderSlice";

export function* handleValidateSession() {
  try {
    yield call(sendShowLoader);
    yield put(showLoader());

    yield put(setSessionStatus(SessionStatus.SESSION_PENDING_VALIDATION));
    const response: AxiosResponse = yield call(requestValidateSession);

    if (isTimeExpires(response?.data?.expiresAt)) {
      yield put(setSessionStatus(SessionStatus.INVALID_SESSION));
      yield call(sendMessage, { action: postMessageActions.SESSION_INVALID });
    } else {
      yield call(handleGetSession);
      yield put(setSessionStatus(SessionStatus.VALID_SESSION));
      yield removeSearchQueriesFromURL();
    }
  } catch (error: any) {
    yield put(hideLoader());
    yield put(setSessionStatus(SessionStatus.INVALID_SESSION));
    yield call(sendMessage, { action: postMessageActions.SESSION_INVALID });
    yield call(sendMessage, {
      action: postMessageActions.ERROR,
      payload: error,
    });
  } finally {
    yield put(hideLoader());
  }
}

export function* handleGetSession() {
  try {
    yield call(sendShowLoader);
    yield put(showLoader());
    const response: AxiosResponse = yield call(fetchSession);
    yield put(setSession(response.data));
  } catch (error: unknown) {
    yield call(sendHideLoader);

    yield put(hideLoader());
    yield call(sendMessage, {
      action: postMessageActions.ERROR,
      payload: { error },
    });
  } finally {
    yield put(hideLoader());
  }
}

export function* watchValidateSession() {
  yield takeLatest(validateSession.type, handleValidateSession);
}
