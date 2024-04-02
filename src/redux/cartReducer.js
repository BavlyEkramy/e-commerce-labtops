import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  products: [],
  allInfo: {},
  signIn: false,
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const sameId = state.products.find((pro) => pro.id === action.payload.id);

      !sameId && state.products.push(action.payload);
    },
    deleteFromCart: (state, action) => {
      state.products = state.products.filter(
        (pro) => pro.id !== action.payload.id
      );
    },
    getInfo: (state, action) => {
      state.allInfo = action.payload;
    },
    deleteInfo: (state) => {
      state.allInfo = {};
    },
    logInSuccess: (state) => {
      state.signIn = true;
    },
    logOutSuccess: (state) => {
      state.signIn = false;
    },
  },
});

export const {
  addToCart,
  deleteFromCart,
  getInfo,
  deleteInfo,
  logInSuccess,
  logOutSuccess,
} = cartSlice.actions;

export default cartSlice.reducer;
