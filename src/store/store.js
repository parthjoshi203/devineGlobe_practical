import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./slices/authSlice";
import listSlice from "./slices/listSlice";

export const store = configureStore({
  reducer: {
    auth: authSlice,
    list: listSlice,
  },
});
