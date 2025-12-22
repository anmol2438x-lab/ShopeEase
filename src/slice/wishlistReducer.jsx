import { createSlice } from "@reduxjs/toolkit";
import { getWishlistItems } from "../localStorage/handleStorage";

const initialState = {
  whislistItems: getWishlistItems(),
};

export const wishlistReducer = createSlice({
  name: "whislistItems",
  initialState,
  reducers: {
    toggleWishlist: (state, action) => {
      if (state.whislistItems.find((item) => item.id === action.payload.id)) {
        state.whislistItems = state.whislistItems.filter(
          (item) => item.id !== action.payload.id
        );
      } else {
        state.whislistItems.push(action.payload);
      }
    },
  },
});

export const { toggleWishlist} = wishlistReducer.actions;
