import { useDispatch, useSelector } from "react-redux";
import Button from "../atom/button";
import { Session, SessionStatus } from "../../type/session.definition";
import { selectSessionStatus } from "../../redux/reducers/validateSessionSlice";
import { Fragment, useEffect, useState } from "react";
import { selectSession } from "../../redux/reducers/sessionSlice";
import { showLoader } from "../../redux/reducers/loaderSlice";
import { appUrl, getPaymentDetailsFromUrl, portalAppUrl } from "../../util";
import { selectPaymentResult } from "../../redux/reducers/paymentSlice";
import PaymentSuccessCheck from "../atom/paymentSuccessCheck";
import { PaymentResult } from "../../type/payment.definition";

function MediaPpvButton() {
  const sessionStatus: SessionStatus = useSelector(selectSessionStatus);
  const [buttonLabel, setButtonLabel] = useState<string>("Pay with mediaPPV");
  const session = useSelector(selectSession) as unknown as Session;
  const paymentResult = useSelector(selectPaymentResult);
  const dispatch = useDispatch();
  useEffect(() => {
    if (sessionStatus === SessionStatus.SESSION_PENDING_VALIDATION) {
      setButtonLabel("Validating session...");
    } else if (
      sessionStatus === SessionStatus.INVALID_SESSION &&
      paymentResult === "INIT"
    ) {
      setButtonLabel("requesting login...");
    } else if (sessionStatus === SessionStatus.VALID_SESSION) {
      if (paymentResult === "SUCCESS") {
        setButtonLabel("Checking credits...");
      } else {
        setButtonLabel("Payment Successful...");
      }
    } else {
      setButtonLabel("Pay with mediaPPV");
    }
    if (session && session?.settings.credit) {
      setButtonLabel("Pay with mediaPPV");
    }
  }, [sessionStatus, session, dispatch]);

  return (
    <Fragment>
      {paymentResult === PaymentResult.SUCCESS ? (
        <PaymentSuccessCheck />
      ) : (
        <Button label={buttonLabel} />
      )}
    </Fragment>
  );
}

export default MediaPpvButton;
