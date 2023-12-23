import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { addToCart, fetchCartItemsById, updateCart,removefromCart } from './cartApi';

const initialState = {
  status:'idle',
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


// Update Cart 

export const updateCartAsync = createAsyncThunk(
  'cart/updateCart',
  async (update) => {
    const response = await updateCart(update);
    // The value we return becomes the `fulfilled` action payload
    return response.data;
  }
);



export const removefromCartAsync = createAsyncThunk(
  'cart/removefromCart',
  async (update) => {
    const response = await removefromCart(update);
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
      })

      .addCase(updateCartAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(updateCartAsync.fulfilled, (state, action) => {
        // Replace the Old Info with the new so find the item in an array from incoming payload and replace new 
        state.status = 'idle';
        const index = state.items.findIndex((item)=> item.id===action.payload.id)
        state.items[index] = action.payload; 
      })

      .addCase(removefromCartAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(removefromCartAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        const index = state.items.findIndex((item)=> item.id===action.payload.id)
        state.items.splice(index,1)

      })
  },
});




export const selectItems = (state) => state.cart.items;


export default cartSlice.reducer;
