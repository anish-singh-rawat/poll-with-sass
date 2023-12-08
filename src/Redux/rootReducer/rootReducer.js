import { combineReducers } from "@reduxjs/toolkit";
import  signupSlice  from "../slice/signUp";
import  loginSlice  from "../slice/login";
import  pollSlice  from "../slice/userPoll";
import  adminPollSlice  from "../slice/AdminPoll";
import  listDataSlice  from "../slice/listData";
import  deleteTitleSlice  from "../slice/DeleteTitle";
import  deleteOptionSlice  from "../slice/deleteOption";
import  editTitleSlice  from "../slice/EditTitle";
import  addOptionSlice  from "../slice/AddOption";
import  addVote  from "../slice/AddVote";

 const rootReducer = combineReducers({
    signupSlice : signupSlice,
    loginSlice : loginSlice,
    pollSlice : pollSlice,
    adminPollSlice : adminPollSlice,
    listDataSlice : listDataSlice,
    deleteTitleSlice : deleteTitleSlice,
    deleteOptionSlice : deleteOptionSlice,
    editTitleSlice : editTitleSlice,
    addOptionSlice : addOptionSlice,
    addVote : addVote,
})
export default rootReducer