import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";

export const loaderSlice = createSlice({
  initialState: false,
  name: "loader",
  reducers: {
    showLoader: () => true,

    hideLoader: () => false,
  },
});

// Action creators are generated for each case reducer function
export const { showLoader, hideLoader } = loaderSlice.actions;

// get select the state and expose them
export const selectLoader = (state: RootState) => state.loader;

export default loaderSlice.reducer;
