import { createSlice } from "@reduxjs/toolkit";
import { dispatch } from "../store/store";
import Instance from "../../utilities/axios";

const initialState = {
  isLoading: false,
  isSuccess: false,
  isError: false,
  data: {},
};

const addOptionSlice = createSlice({
  name: "Addoption",
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

export function AddOption(OptionId, OptionData) {
  return async () => {
    dispatch(addOptionSlice.actions.startLoading());
    try {
      const response = await Instance.delete(`add_new_option?id=${OptionId}&option_text=${OptionData}`);
      dispatch(addOptionSlice.actions.loginSuccess(response.data));
      
    } catch (error) {
      dispatch(addOptionSlice.actions.hasError(error));
    }
  }
}

export const { startLoading, hasError, loginSuccess, resetReducer }
  = addOptionSlice.actions;
export default addOptionSlice.reducer;


