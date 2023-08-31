import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  users: [],
  isLoading: false,
  error: undefined,
};

export const fetchUsers = createAsyncThunk('users/fetchUsers', async () => {
  try {
    const response = await axios.get('https://randomuser.me/api/?results=5');
    return response.data.results;
  } catch (error) {
    throw error.response.data.error.message;
  }
});

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.isLoading = false;
        state.users = action.payload;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      });
  },
});

export const usersReducer = usersSlice.reducer;
