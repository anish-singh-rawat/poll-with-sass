import { createSlice } from "@reduxjs/toolkit";
import { dispatch } from "../store/store";
import Instance from "../../utilities/axios";

const initialState = {
  isLoading: false,
  isSuccess: false,
  isError: false,
  data: {},
};

const deleteTitleSlice = createSlice({
  name: "deleteTitle",
  initialState,
  reducers: {
    startLoading(state) {
      state.isLoading = true;
      state.isError = false;
    },
    loginSuccess(state, action) {
      state.isLoading = false;
      state.isError = false;
      state.isSuccess = true;
      state.data = { ...action.payload };
    },
    hasError(state, action) {
      state.isError = true;
      state.isLoading = false;
      state.isSuccess = false;
      state.data = { ...action.payload };
    },
    resetReducer(state) {
      state.isError = false;
      state.isLoading = false;
      state.isSuccess = false;
      state.data = {};
    },
  },
});

export function DeleteTitle(payload) {
  return async () => {
    dispatch(deleteTitleSlice.actions.startLoading());
    try {
        const response = await Instance.delete(`delete_poll?id=${payload}`);
      dispatch(deleteTitleSlice.actions.loginSuccess(response.data));
    } catch (e) {
      dispatch(deleteTitleSlice.actions.hasError(e));
    }
  }
}

export const { startLoading, hasError, loginSuccess, resetReducer } 
= deleteTitleSlice.actions;
export default deleteTitleSlice.reducer;


