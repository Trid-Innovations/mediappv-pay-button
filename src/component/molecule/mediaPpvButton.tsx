import { useSelector } from "react-redux";
import Button from "../atom/button";
import { Session, SessionStatus } from "../../type/session.definition";
import { selectSessionStatus } from "../../redux/reducers/validateSessionSlice";
import { useEffect, useState } from "react";
import { selectSession } from "../../redux/reducers/sessionSlice";

function MediaPpvButton() {
  const sessionStatus: SessionStatus = useSelector(selectSessionStatus);
  const [buttonLabel, setButtonLabel] = useState<string>("Pay with mediaPPV");
  const session = useSelector(selectSession) as unknown as Session;

  useEffect(() => {
    if (sessionStatus === SessionStatus.SESSION_PENDING_VALIDATION) {
      setButtonLabel("Validating session...");
    } else if (sessionStatus === SessionStatus.INVALID_SESSION) {
      setButtonLabel("requesting login...");
    } else if (sessionStatus === SessionStatus.VALID_SESSION) {
      setButtonLabel("Checking credits...");
    } else {
      setButtonLabel("Pay with mediaPPV");
    }
    debugger;
    if (session && session?.settings.credit) {
      setButtonLabel("Pay with mediaPPV");
    }
  }, [sessionStatus, session]);

  return <Button label={buttonLabel} />;
}

export default MediaPpvButton;
