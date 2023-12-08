import { createSlice } from "@reduxjs/toolkit";
import { dispatch } from "../store/store";
import Instance from "../../utilities/axios";

const pollSlice = createSlice({
    name: "poll",
    initialState : {
        isLoading: false,
        isSuccess: false,
        isError: false,
        data: [],
    },
    reducers: {
        startLoading(state) {
            state.isLoading = true;
            state.isError = false;
        },
        getSuccess(state, action) {
            state.isLoading = false;
            state.isError = false;
            state.isSuccess = true;
            state.data = action.payload.data.reverse();
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
            state.data = [];
        },
    },
});

export function pollManage() {
    return async () => {
        dispatch(pollSlice.actions.startLoading());
        try {
            const response = await Instance.post("list_polls");
            dispatch(pollSlice.actions.getSuccess(response.data));
        } catch (error) {
            dispatch(pollSlice.actions.hasError(error));
        }
    }
}


export const { startLoading, hasError, getSuccess, resetReducer } = pollSlice.actions;
export default pollSlice.reducer;