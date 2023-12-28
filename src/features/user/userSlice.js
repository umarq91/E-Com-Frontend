import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { fetchLoggedInUser } from './userAPI';

const initialState = {
  userInfo: null,
  status: 'idle',
};
export const fetchLoggedInUserAsync = createAsyncThunk(
  'user/fetchLoggedInUser',
  async (userId) => {
    const response = await fetchLoggedInUser(userId);
    // The value we return becomes the `fulfilled` action payload
    return response.data;
  }
);

export const counterSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    increment: (state) => {
    
      state.value += 1;
    },
  },
  
  extraReducers: (builder) => {
    builder
      .addCase(fetchLoggedInUserAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchLoggedInUserAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.userInfo = action.payload;
      });
  },
});

export const { increment } = counterSlice.actions;


export const selectCount = (state) => state.counter.value;


export default counterSlice.reducer;
