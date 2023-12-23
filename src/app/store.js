import { configureStore } from '@reduxjs/toolkit';
import productReducer from '../features/product/productSlice'
import authReducer from "../features/auth/AuthSlice"
import cartSlice from '../features/Cart/cartSlice';
export const store = configureStore({
  reducer: {
    product: productReducer,
    auth:authReducer,
    cart:cartSlice
  },
});
