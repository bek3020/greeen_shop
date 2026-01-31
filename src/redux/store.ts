import { configureStore } from "@reduxjs/toolkit";
import shopReducer from "./shop-slice";
import modalReducer from "./modol-store";
import userReducer from "./user-slice";

export const store = configureStore({
  reducer: {
    cart: shopReducer,  // shopSlice o'rniga cart (savatcha)
    modal: modalReducer, // modal
    user: userReducer,  // user slice qo'shildi
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;