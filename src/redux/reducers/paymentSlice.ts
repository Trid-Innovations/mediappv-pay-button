import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { Payment } from "../../type/payment.definition";

const initialState: Payment = {
  result: null,
  details: null,
};
export const paymentSlice = createSlice({
  initialState,
  name: "payment",
  reducers: {
    setPaymentResult: (state, { payload }) => {
      state.result = payload;
    },
    setPaymentDetails: (state, { payload }) => {
      state.details = payload;
    },
    doAuthorizeAndCapture: (state, { payload }) => {},
  },
});

// Action creators are generated for each case reducer, function
export const { setPaymentResult, doAuthorizeAndCapture, setPaymentDetails } =
  paymentSlice.actions;

// get select the state and expose them
export const selectPaymentResult = (state: RootState) => state.payment.result;
export const selectPaymentDetails = (state: RootState) => state.payment.details;

export default paymentSlice.reducer;
