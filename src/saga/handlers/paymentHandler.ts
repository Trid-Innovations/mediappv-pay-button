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
import { PaymentResult } from "../../type/payment.definition";

export function* handleAuthorizeAndCapture({ payload }: any) {
  try {
    yield call(sendShowLoader);
    yield put(showLoader());
    const response: AxiosResponse = yield call(authorizeAndCapture, payload);
    yield put(setPaymentResult(PaymentResult.SUCCESS));
    yield call(sendMessage, {
      action: postMessageActions.PAYMENT_RESULT,
      payload: {
        paymentResult: PaymentResult.SUCCESS,
        remainingCredits: response.data.remainingCredits,
      },
    });
  } catch (error: unknown) {
    yield call(sendHideLoader);
    yield put(hideLoader());
    yield put(setPaymentResult(PaymentResult.FAIL));
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
