import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";
import {
  SessionStatus,
  ValidateSessionState,
} from "../../type/session.definition";

const initialState: ValidateSessionState = {
  status: SessionStatus.SESSION_PENDING_VALIDATION,
};

export const validateSessionSlice = createSlice({
  initialState,
  name: "validateSession",
  reducers: {
    validateSession: (state, { payload }: PayloadAction<string>) => {},
    setSessionStatus: (state, action) => {
      return action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { validateSession, setSessionStatus } =
  validateSessionSlice.actions;
export const selectSessionStatus = (state: RootState) =>
  state.sessionValidity.status;
export default validateSessionSlice.reducer;
