import { all } from "redux-saga/effects";
import {
  watchValidateSession,
  watchGetSession,
} from "./handlers/sessionHandler";

export function* watcherSaga() {
  yield all([watchValidateSession(), watchGetSession()]);
}
