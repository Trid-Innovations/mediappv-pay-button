import { useDispatch, useSelector } from "react-redux";
import { selectLoader, showLoader } from "../../redux/reducers/loaderSlice";
import Loader from "./loader";
import { validateSession } from "../../redux/reducers/validateSessionSlice";
import { PaymentResult } from "../../type/payment.definition";
import { setPaymentResult } from "../../redux/reducers/paymentSlice";
type Props = {
  label: string;
};
function Button({ label }: Props) {
  const loader = useSelector(selectLoader);
  const dispatch = useDispatch();
  const onPayButtonClick = () => {
    dispatch(validateSession());
    dispatch(setPaymentResult(PaymentResult.INIT));
  };

  return (
    <button className="mediappv__button relative" onClick={onPayButtonClick}>
      {label}
      {loader && <Loader />}
    </button>
  );
}

export default Button;
