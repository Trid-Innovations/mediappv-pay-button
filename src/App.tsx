import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import MediaPpvButton from "./component/molecule/mediaPpvButton";
import {
  selectSessionStatus,
  validateSession,
} from "./redux/reducers/validateSessionSlice";
import { getPaymentDetailsFromUrl } from "./util";
import { PaymentDetails, PaymentResult } from "./type/payment.definition";
import {
  doAuthorizeAndCapture,
  selectPaymentDetails,
  selectPaymentResult,
  setPaymentDetails,
  setPaymentResult,
} from "./redux/reducers/paymentSlice";
import { authorizeAndCapture } from "./requests/paymentClient";
import { SessionStatus } from "./type/session.definition";

function App() {
  const dispatch = useDispatch();
  const paymentDetails = useSelector(selectPaymentDetails);
  const paymentResult = useSelector(selectPaymentResult);
  const sessionStatue = useSelector(selectSessionStatus);

  useEffect(() => {
    const {
      providerId,
      articleCost,
      articleLink,
      providerName,
      requestedForPayment,
    } = getPaymentDetailsFromUrl();

    if (providerId && articleCost && articleLink && providerName) {
      const payload: PaymentDetails = {
        provider: {
          id: providerId,
          name: providerName,
        },
        article: {
          link: articleLink,
          cost: articleCost,
        },
      };
      if (requestedForPayment === "true") {
        dispatch(setPaymentResult(PaymentResult.INIT));
      }
      console.log({ payload });
      dispatch(validateSession());
      dispatch(setPaymentDetails(payload));
    }
  }, [dispatch]);

  useEffect(() => {
    if (
      PaymentResult.INIT === paymentResult &&
      sessionStatue === SessionStatus.VALID_SESSION
    ) {
      dispatch(doAuthorizeAndCapture(paymentDetails));
    }
  }, [paymentResult, sessionStatue]);

  return <MediaPpvButton />;
}

export default App;
