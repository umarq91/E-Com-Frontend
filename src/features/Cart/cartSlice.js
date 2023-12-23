import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { addToCart, fetchCartItemsById, fetchCount } from './cartApi';

const initialState = {
  value: 0,
  items: [],
};
export const addtoCartAsync = createAsyncThunk(
  'cart/addToCart',
  async (item) => {
    const response = await addToCart(item);
    // The value we return becomes the `fulfilled` action payload
    return response.data;
  }
);

export const fetchCartItemsByIdAsync = createAsyncThunk(
  'cart/fetchCartItems',
  async (item) => {
    const response = await fetchCartItemsById(item);
    // The value we return becomes the `fulfilled` action payload
    return response.data;
  }
);

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    increment: (state) => {
      state.value += 1;
    },
  },
  
  extraReducers: (builder) => {
    builder
      .addCase(addtoCartAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(addtoCartAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.items.push(action.payload);
      })

      .addCase(fetchCartItemsByIdAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchCartItemsByIdAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.items = action.payload;
      });
  },
});




export const selectCount = (state) => state.counter.value;


export default cartSlice.reducer;
