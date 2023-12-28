import { configureStore } from '@reduxjs/toolkit';
import productReducer from '../features/product/productSlice'
import authReducer from "../features/auth/AuthSlice"
import cartSlice from '../features/Cart/cartSlice';
import orderSlice from '../features/order/orderSlice';
import userSlice from '../features/user/userSlice';
export const store = configureStore({
  reducer: {
    product: productReducer,
    auth:authReducer,
    cart:cartSlice,
    order:orderSlice,
    user:userSlice
  },
});
