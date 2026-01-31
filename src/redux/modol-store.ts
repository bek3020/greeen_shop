import { createSlice } from "@reduxjs/toolkit";

interface InitialStateType {
  authorizationModalVisibility: boolean; // "Visibility" deb to'g'rilandi
  orderModalVisibility: boolean;         // Buyurtma muvaffaqiyatli oynasi uchun qo'shildi
}

const initialState: InitialStateType = {
  authorizationModalVisibility: false,
  orderModalVisibility: false,
};

export const modalSlice = createSlice({
  name: "modal", // Qisqaroq nom yaxshiroq
  initialState,
  reducers: {
    // Login/Register oynasini ochish-yopish
    setAuthorizationModalVisibility(state) {
      state.authorizationModalVisibility = !state.authorizationModalVisibility;
    },
    // Buyurtma muvaffaqiyatli (Thank you) oynasini ochish-yopish
    setOrderModalVisibility(state) {
      state.orderModalVisibility = !state.orderModalVisibility;
    }
  }
});

// Actionlarni export qilamiz
export const { 
  setAuthorizationModalVisibility, 
  setOrderModalVisibility 
} = modalSlice.actions;

export default modalSlice.reducer;