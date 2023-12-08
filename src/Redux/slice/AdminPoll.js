import { createSlice } from "@reduxjs/toolkit";
import { dispatch } from "../store/store";
import Instance from "../../utilities/axios";

const initialState = {
    isLoading: false,
    isSuccess: false,
    isError: false,
    data: [],
};
const adminPollSlice = createSlice({
    name: "poll",
    initialState,
    reducers: {
        startLoading(state) {
            state.isLoading = true;
            state.isError = false;
        },
        getSuccess(state, action) {
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
            state.data = [];
        },
    },
});

export function pollManage() {
    return async () => {
        dispatch(adminPollSlice.actions.startLoading());
        try {
            const response = await
                Instance.post("list_polls");
            dispatch(adminPollSlice.actions.getSuccess(response.data));
        } catch (error) {
            dispatch(adminPollSlice.actions.hasError(error));
        }
    }
}


export const { startLoading, hasError, getSuccess, resetReducer } = adminPollSlice.actions;
export default adminPollSlice.reducer;