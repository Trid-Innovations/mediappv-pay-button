import { useDispatch, useSelector } from "react-redux";
import { selectLoader } from "../../redux/reducers/loaderSlice";
import Loader from "./loader";
import { validateSession } from "../../redux/reducers/validateSessionSlice";

type Props = {
  label: string;
};
function Button({ label }: Props) {
  const loader = useSelector(selectLoader);
  const dispatch = useDispatch();
  const validatingSession = () => {
    dispatch(validateSession());
  };
  return (
    <button className="mediappv__button relative" onClick={validatingSession}>
      {label}
      {loader && <Loader />}
    </button>
  );
}

export default Button;
