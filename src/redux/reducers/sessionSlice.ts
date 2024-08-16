import { Session, SessionStatus } from "../../type/session.definition";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";
const initialState: Session | null = null;

export const sessionSlice = createSlice({
  name: "session",
  initialState,
  reducers: {
    getSession: (state) => {},
    setSession: (state, { payload }: PayloadAction<Session | null>) => {},
  },
});
const { getSession, setSession } = sessionSlice.actions;

export const selectSession = (state: RootState) => state.session;

export { getSession, setSession };

export default sessionSlice.reducer;
