import { all } from "redux-saga/effects";
import { watchValidateSession } from "./handlers/sessionHandler";
import { watchAuthorizeAndCapture } from "./handlers/paymentHandler";

export function* watcherSaga() {
  yield all([watchValidateSession(), watchAuthorizeAndCapture()]);
}
