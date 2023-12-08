import { createSlice } from "@reduxjs/toolkit";
import { dispatch } from "../store/store";
import Instance from "../../utilities/axios";

const initialState = {
  isLoading: false,
  isSuccess: false,
  isError: false,
  data: {},
};

const editTitleSlice = createSlice({
  name: "editTitle",
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

export function EditTitle(titleId, titleData) {
  return async () => {
    dispatch(editTitleSlice.actions.startLoading());
    try {
      const response = await Instance.delete(`update_poll_title?id=${titleId}&title=${titleData}`);
      dispatch(editTitleSlice.actions.loginSuccess(response.data));
      
    } catch (error) {
      dispatch(editTitleSlice.actions.hasError(error));
    }
  }
}

export const { startLoading, hasError, loginSuccess, resetReducer }
  = editTitleSlice.actions;
export default editTitleSlice.reducer;


