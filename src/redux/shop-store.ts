import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { ProductType } from "../@types";

interface InitialStateType {
  data: ProductType[];
}

const saved = localStorage.getItem("shop");
const initialState: InitialStateType = {
  data: saved ? (JSON.parse(saved) as ProductType[]) : [],
};

const shopSlice = createSlice({
  name: "shop-slice",
  initialState,
  reducers: {
    getData(state, action: PayloadAction<ProductType>) {
      state.data = [...state.data, action.payload];
      localStorage.setItem("shop", JSON.stringify(state.data));
    },
  },
});

export const { getData } = shopSlice.actions;
export default shopSlice.reducer;
