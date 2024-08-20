import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import MediaPpvButton from "./component/molecule/mediaPpvButton";
import { validateSession } from "./redux/reducers/validateSessionSlice";
import { getPaymentDetailsFromUrl } from "./util";
import { PaymentDetails, PaymentResult } from "./type/payment.definition";
import {
  doAuthorizeAndCapture,
  selectPaymentDetails,
  selectPaymentResult,
  setPaymentDetails,
} from "./redux/reducers/paymentSlice";
import { authorizeAndCapture } from "./requests/paymentClient";

function App() {
  const dispatch = useDispatch();
  const paymentDetails = useSelector(selectPaymentDetails);
  const paymentResult = useSelector(selectPaymentResult);

  useEffect(() => {
    const { providerId, articleCost, articleLink, providerName } =
      getPaymentDetailsFromUrl();

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

      console.log({ payload });
      dispatch(validateSession());
      dispatch(setPaymentDetails(payload));
    }
  }, [dispatch]);

  useEffect(() => {
    debugger;
    if (PaymentResult.INIT === paymentResult) {
      dispatch(doAuthorizeAndCapture(paymentDetails));
    }
  }, [paymentResult]);

  return <MediaPpvButton />;
}

export default App;
