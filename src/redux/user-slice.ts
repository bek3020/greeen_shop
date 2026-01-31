import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import Cookies from "js-cookie";
import type { AuthType } from "../@types";

interface InitialStateType {
  user: AuthType | null;
  token: string | null;
  wishlist: string[]; // Wishlist qo'shildi
  orders: any[]; // Buyurtmalar ro'yxati
}

const getInitialUser = (): AuthType | null => {
  const cookieUser = Cookies.get("user");
  if (!cookieUser) return null;

  try {
    return JSON.parse(cookieUser) as AuthType;
  } catch {
    return null;
  }
};

const getInitialToken = (): string | null => {
  return Cookies.get("token") || null;
};

const getInitialWishlist = (): string[] => {
  const wishlist = localStorage.getItem("wishlist");
  return wishlist ? JSON.parse(wishlist) : [];
};

const initialState: InitialStateType = {
  user: getInitialUser(),
  token: getInitialToken(),
  wishlist: getInitialWishlist(),
  orders: [],
};

export const userSlice = createSlice({
  name: "user-slice",
  initialState,
  reducers: {
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

    clearUser(state) {
      state.user = null;
      state.token = null;
      state.wishlist = [];
      state.orders = [];
      Cookies.remove("user");
      Cookies.remove("token");
      localStorage.removeItem("wishlist");
    },

    // Wishlist funksiyalari
    addToWishlist(state, action: PayloadAction<string>) {
      if (!state.wishlist.includes(action.payload)) {
        state.wishlist.push(action.payload);
        localStorage.setItem("wishlist", JSON.stringify(state.wishlist));
      }
    },

    removeFromWishlist(state, action: PayloadAction<string>) {
      state.wishlist = state.wishlist.filter(id => id !== action.payload);
      localStorage.setItem("wishlist", JSON.stringify(state.wishlist));
    },

    // Buyurtmalar
    addOrder(state, action: PayloadAction<any>) {
      state.orders.push(action.payload);
    },

    setOrders(state, action: PayloadAction<any[]>) {
      state.orders = action.payload;
    },
  },
});

export const {
  setUser,
  clearUser,
  addToWishlist,
  removeFromWishlist,
  addOrder,
  setOrders
} = userSlice.actions;
export default userSlice.reducer;
