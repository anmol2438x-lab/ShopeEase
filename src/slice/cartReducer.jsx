import { createSlice } from "@reduxjs/toolkit";
import {
  getAppliedCoupon,
  getItemsFromCartLocal,
} from "../localStorage/handleStorage";

const initialState = {
  cartItems: getItemsFromCartLocal() || [],
  appliedCoupon: getAppliedCoupon(),
  cartSummary: {
    subtotal: null,
    shipping: null,
    discount: null,
    tax: null,
    total: null,
  },
};

export const cartReducer = createSlice({
  name: "cartItems",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const existingItem = state.cartItems.find(
        (item) => item.id === action.payload.id
      );
      if (existingItem) {
        state.cartItems = state.cartItems.map((item) =>
          item.id === action.payload.id ? action.payload : item
        );
      } else {
        state.cartItems.push(action.payload);
      }
    },
    removeFromCart: (state, action) => {
      state.cartItems = state.cartItems.filter(
        (item) => item.id !== action.payload
      );
    },
    updateCart: (state, action) => {
      state.cartItems = action.payload;
    },
    incItemCartQuantity: (state, action) => {
      state.cartItems = state.cartItems.map((item) =>
        item.id === action.payload && item.quantity < item.stock
          ? { ...item, quantity: item.quantity + 1 }
          : item
      );
    },
    decItemCartQuantity: (state, action) => {
      state.cartItems = state.cartItems.map((item) =>
        item.id === action.payload && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item
      );
    },
    clearCart: (state) => {
      state.cartItems = [];
      state.cartSummary = {
        appliedCoupon: {},
        subtotal: null,
        shipping: null,
        discount: null,
        tax: null,
        total: null,
      };
    },
    updateCartSummary: (state, action) => {
      Object.keys(state.cartSummary).forEach((key) => {
        if (action.payload[key] !== undefined) {
          state.cartSummary[key] = action.payload[key];
        }
      });
    },
    setAppliedCoupon: (state, actiion) => {
      state.appliedCoupon = actiion.payload
    }
  },
});

export const {
  addToCart,
  removeFromCart,
  updateCart,
  decItemCartQuantity,
  incItemCartQuantity,
  clearCart,
  updateCartSummary,
  setAppliedCoupon
} = cartReducer.actions;
export default cartReducer.reducer;
