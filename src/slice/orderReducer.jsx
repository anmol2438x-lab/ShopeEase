import { createSlice } from "@reduxjs/toolkit";
import { getOrders, setOrders } from "../localStorage/handleStorage";

const initialState = {
  orders: getOrders(),
};

const orderReducer = createSlice({
  name: "orderItems",
  initialState,
  reducers: {
    addOrders: (state, action) => {
      state.orders = [action.payload, ...state.orders];
    },
    updateStatus: (state, action) => {
      const {id, status} = action.payload
      const updatedStatus = state.orders.map((item) => item.id === id ? {...item, status: status } : item)
    
      state.orders = updatedStatus;
      setOrders(updatedStatus);
    },
  },
});

export const { addOrders, updateStatus } = orderReducer.actions;

export default orderReducer;
