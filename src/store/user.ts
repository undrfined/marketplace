import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import makeRequest from '../api/makeRequest';
import type { RootState } from './store';

type UserState = {
  isLoading: boolean;
  error?: string;
  message?: string;
};

const initialState: UserState = {
  isLoading: false,
};

export const getInfo = createAsyncThunk(
  'user/getInfo',
  (_, { getState }) => makeRequest('api', null, 'GET', (getState() as RootState).auth.token),
);

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
  },
  extraReducers: (builder) => {
    builder
      .addCase(getInfo.pending, (state) => {
        state.error = undefined;
        state.isLoading = true;
      })
      .addCase(getInfo.rejected, (state, { error }) => {
        state.error = error.message;
        state.isLoading = false;
      })
      .addCase(getInfo.fulfilled, (state, { payload }) => {
        state.message = payload.message;
        // eslint-disable-next-line no-alert
        alert(payload.message);
        state.isLoading = false;
      });
  },
});

export default userSlice.reducer;
