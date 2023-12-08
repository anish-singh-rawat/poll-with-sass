import { configureStore } from "@reduxjs/toolkit";
import  rootReducer  from "../rootReducer/rootReducer";

 const store = configureStore({
    reducer : rootReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
})
export const { dispatch } = store;
export default store;