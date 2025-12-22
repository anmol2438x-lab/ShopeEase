import { createSlice } from "@reduxjs/toolkit";
import { getRecentlyViewed } from "../localStorage/handleStorage";


const initialState = {
  allProducts: [],
  categoryProducts: [],
  recentlyViewedPro: getRecentlyViewed(),
};

export const productsReducer = createSlice({
  name: "products",
  initialState,
  reducers: {
    addAllProducts: (state, action) => {
      state.allProducts = action.payload
    },
    addCategoryPro: (state, action) => {
      state.categoryProducts.push(...action.payload)
    },
    addRecentlyViewedPro: (state, action) => {
      state.recentlyViewedPro = action.payload
    },
  },
});



export const {addAllProducts, addCategoryPro, addRecentlyViewedPro} = productsReducer.actions
