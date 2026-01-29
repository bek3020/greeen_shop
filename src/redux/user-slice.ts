import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import Cookies from "js-cookie";
import type { AuthType } from "../@types";

interface InitialStateType {
  user: AuthType | null;
  token: string | null;
}

// Cookie dan user olish
const getInitialUser = (): AuthType | null => {
  const cookieUser = Cookies.get("user");
  if (!cookieUser) return null;

  try {
    return JSON.parse(cookieUser) as AuthType;
  } catch {
    return null;
  }
};

// Cookie dan token olish
const getInitialToken = (): string | null => {
  return Cookies.get("token") || null;
};

const initialState: InitialStateType = {
  user: getInitialUser(),
  token: getInitialToken(),
};

export const userSlice = createSlice({
  name: "user-slice",
  initialState,
  reducers: {
    // Login bo‘lganda user + token saqlash
    setUser(
      state,
      action: PayloadAction<{ user: AuthType; token?: string }>
    ) {
      state.user = action.payload.user;

      if (action.payload.token) {
        state.token = action.payload.token;
        Cookies.set("token", action.payload.token, { expires: 7 });
      }

      Cookies.set("user", JSON.stringify(action.payload.user), {
        expires: 7,
      });
    },

    // Logout
    clearUser(state) {
      state.user = null;
      state.token = null;
      Cookies.remove("user");
      Cookies.remove("token");
    },
  },
});

export const { setUser, clearUser } = userSlice.actions;
export default userSlice.reducer;
