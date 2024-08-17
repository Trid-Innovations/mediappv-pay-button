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
  return <MediaPpvButton />;
}

export default App;
