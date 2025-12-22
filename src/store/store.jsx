import {configureStore} from '@reduxjs/toolkit'
import { cartReducer, productsReducer, wishlistReducer, filterReducer, orderReducer } from '../slice'


export const store = configureStore({
  reducer: {
    productsReducer: productsReducer.reducer,
    cartReducer: cartReducer.reducer,
    wishlistReducer: wishlistReducer.reducer,
    filterReducer: filterReducer.reducer,
    orderReducer: orderReducer.reducer    
  },
  devTools: process.env.NODE_ENV !== 'production',
})

