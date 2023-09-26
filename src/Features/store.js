import { configureStore } from "@reduxjs/toolkit";
import uiReducer from "./uiSlice";
import authReducer from "./auth/authSlice"
import { apiSlice } from "../Api/apiSlice";

export default configureStore({
    reducer: {
        [apiSlice.reducerPath]: apiSlice.reducer,
        ui: uiReducer,
        auth: authReducer
    },
    middleware: getDefaultMiddleware => 
    getDefaultMiddleware().concat(apiSlice.middleware),
    devTools: true
})