import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import MediaPpvButton from "./component/molecule/mediaPpvButton";
import {
  selectSessionStatus,
  validateSession,
} from "./redux/reducers/validateSessionSlice";
import { SessionStatus } from "./type/session.definition";
import { getSessionTokenFromUrl } from "./util";

function App() {
  const dispatch = useDispatch();
  const sessionStatus = useSelector(selectSessionStatus);

  const sessionToken: string = getSessionTokenFromUrl();

  useEffect(() => {
    if (sessionStatus === SessionStatus.VALID_SESSION) {
      console.log("Valid Session");
    } else if (sessionStatus === SessionStatus.INVALID_SESSION) {
      console.log("Invalid Session");
    } else {
      console.log("validating Session");
    }
  }, [sessionStatus]);

  useEffect(() => {
    dispatch(validateSession(sessionToken));
  }, [dispatch]);

  return <MediaPpvButton />;
}

export default App;
