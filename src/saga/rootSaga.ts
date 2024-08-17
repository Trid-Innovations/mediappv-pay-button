import { all } from "redux-saga/effects";
import { watchValidateSession } from "./handlers/sessionHandler";

export function* watcherSaga() {
  yield all([watchValidateSession()]);
}
