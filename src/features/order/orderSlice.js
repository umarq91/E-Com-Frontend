import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { createOrder } from './orderApi';

const initialState = {
  orders: [],
  status: 'idle',
};
export const createOrderAsync = createAsyncThunk(
  'orders/createOrder',
  async (order) => {
    const response = await createOrder(order);
    // The value we return becomes the `fulfilled` action payload
    return response.data;
  }
);

export const orderSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {
    increment: (state) => {
    
      state.value += 1;
    },
  },
  
  extraReducers: (builder) => {
    builder
      .addCase(createOrderAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(createOrderAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.orders.push(action.payload)
      });
  },
});




// export const selectCount = (state) => state.counter.value;


export default orderSlice.reducer;
