import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

// Savatchada saqlanadigan mahsulot tipi
export interface Product {
  id: string; // API-dagi _id ni shu yerga o'zlashtiramiz
  title: string;
  price: number;
  main_image: string;
  count: number;
}

interface ShopState {
  data: Product[];
  coupon: number;
}

const initialState: ShopState = {
  // LocalStorage dan ma'lumotlarni xavfsiz o'qish
  data: JSON.parse(localStorage.getItem("cart") || "[]"),
  coupon: Number(localStorage.getItem("coupon")) || 0,
};

const shopSlice = createSlice({
  name: "shop",
  initialState,
  reducers: {
    // Savatchaga qo'shish
    addToCart: (state, action: PayloadAction<Product>) => {
      const existing = state.data.find((item) => item.id === action.payload.id);
      if (existing) {
        existing.count += 1;
      } else {
        state.data.push(action.payload);
      }
      localStorage.setItem("cart", JSON.stringify(state.data));
    },

    // Mahsulot sonini oshirish
    increment: (state, action: PayloadAction<string>) => {
      const item = state.data.find((i) => i.id === action.payload);
      if (item) {
        item.count += 1;
        localStorage.setItem("cart", JSON.stringify(state.data));
      }
    },

    // Mahsulot sonini kamaytirish
    decrement: (state, action: PayloadAction<string>) => {
      const item = state.data.find((i) => i.id === action.payload);
      if (item && item.count > 1) {
        item.count -= 1;
        localStorage.setItem("cart", JSON.stringify(state.data));
      }
    },

    // Mahsulotni o'chirish
    deleteData: (state, action: PayloadAction<string>) => {
      state.data = state.data.filter((item) => item.id !== action.payload);
      localStorage.setItem("cart", JSON.stringify(state.data));
    },

    // Chegirma (Coupon) qiymatini o'rnatish
    // Sizda exportda 'discount' edi, shuning uchun 'setDiscount' deb nomladik
    setDiscount: (state, action: PayloadAction<number>) => {
      state.coupon = action.payload;
      localStorage.setItem("coupon", action.payload.toString());
    },

    // Savatchani tozalash (Buyurtma qilinganda kerak bo'ladi)
    clearCart: (state) => {
      state.data = [];
      state.coupon = 0;
      localStorage.removeItem("cart");
      localStorage.removeItem("coupon");
    }
  },
});

// Reducer funksiyalarini export qilish
export const { 
  addToCart, 
  increment, 
  decrement, 
  deleteData, 
  setDiscount, 
  clearCart 
} = shopSlice.actions;

export default shopSlice.reducer;