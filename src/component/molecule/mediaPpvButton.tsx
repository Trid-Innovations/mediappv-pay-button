import { useDispatch, useSelector } from "react-redux";
import Button from "../atom/button";
import { Session, SessionStatus } from "../../type/session.definition";
import { selectSessionStatus } from "../../redux/reducers/validateSessionSlice";
import { useEffect, useState } from "react";
import { selectSession } from "../../redux/reducers/sessionSlice";
import { showLoader } from "../../redux/reducers/loaderSlice";

function MediaPpvButton() {
  const sessionStatus: SessionStatus = useSelector(selectSessionStatus);
  const [buttonLabel, setButtonLabel] = useState<string>("Pay with mediaPPV");
  const session = useSelector(selectSession) as unknown as Session;
  const dispatch = useDispatch();
  useEffect(() => {
    if (sessionStatus === SessionStatus.SESSION_PENDING_VALIDATION) {
      setButtonLabel("Validating session...");
    } else if (sessionStatus === SessionStatus.INVALID_SESSION) {
      setButtonLabel("requesting login...");
      const url = "https://www.example.com"; // Replace with your desired URL
      const newTab = window.open(url, "_blank");
      dispatch(showLoader());
      if (newTab) {
        newTab.focus();
      } else {
        console.error("Failed to open new tab");
      }
    } else if (sessionStatus === SessionStatus.VALID_SESSION) {
      setButtonLabel("Checking credits...");
    } else {
      setButtonLabel("Pay with mediaPPV");
    }
    if (session && session?.settings.credit) {
      setButtonLabel("Pay with mediaPPV");
    }
  }, [sessionStatus, session, dispatch]);

  return <Button label={buttonLabel} />;
}

export default MediaPpvButton;
