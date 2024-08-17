import { Session } from "../../type/session.definition";
import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";
const initialState: Session | null = null;

export const sessionSlice = createSlice({
  name: "session",
  initialState,
  reducers: {
    getSession: () => {},
    setSession: (state, { payload }) => payload,
  },
});
const { getSession, setSession } = sessionSlice.actions;

export const selectSession = (state: RootState) => state.session;
export { getSession, setSession };

export default sessionSlice.reducer;
