import { createSlice } from "@reduxjs/toolkit";
import Cookies from "js-cookie";
import type { AuthType } from "../@types";

interface InitialStateType {
  user: AuthType | null;
}

const userFromCookie = Cookies.get("user");

const initialState: InitialStateType = {
  user: userFromCookie ? JSON.parse(userFromCookie) : null,
};

export const userSlice = createSlice({
  name: "user-slice",
  initialState,
  reducers: {
    getUser(state, action) {
      state.user = action.payload as AuthType | null;
    },
  },
});

export const { getUser } = userSlice.actions;
export default userSlice.reducer;
