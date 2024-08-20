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
import {
  doAuthorizeAndCapture,
  setPaymentResult,
} from "../../redux/reducers/paymentSlice";
import { authorizeAndCapture } from "../../requests/paymentClient";

export function* handleAuthorizeAndCapture({ payload }: any) {
  try {
    yield call(sendShowLoader);
    yield put(showLoader());
    const response: AxiosResponse = yield call(authorizeAndCapture, payload);
    yield put(setPaymentResult(response.data));

    yield call(sendMessage, {
      action: postMessageActions.PAYMENT_RESULT,
      payload: { paymentResult: response.data },
    });
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

export function* watchAuthorizeAndCapture() {
  yield takeLatest(doAuthorizeAndCapture.type, handleAuthorizeAndCapture);
}
