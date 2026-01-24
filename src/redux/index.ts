import { configureStore } from "@reduxjs/toolkit";
import modalReducer from "./modol-store";
import userReducer from "./user-slice";

export const store = configureStore({
  reducer: {
    modal: modalReducer,
    user: userReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
