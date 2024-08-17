import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";
import {
  SessionStatus,
  ValidateSessionState,
} from "../../type/session.definition";

const initialState: ValidateSessionState = {
  status: SessionStatus.NO_SESSION,
};

export const validateSessionSlice = createSlice({
  initialState,
  name: "sessionValidity",
  reducers: {
    validateSession: () => {},
    setSessionStatus: (state, action) => {
      state.status = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { validateSession, setSessionStatus } =
  validateSessionSlice.actions;
export const selectSessionStatus = (state: RootState) =>
  state.sessionValidity.status;
export default validateSessionSlice.reducer;
