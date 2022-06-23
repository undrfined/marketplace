import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import makeRequest from '../api/makeRequest';
import type { RootState } from './store';
import { ApiMethod } from '../api/types';

type UserState = {
  isLoading: boolean;
  error?: string;
  name?: string;
  surname?: string;
  email?: string;
  avatarUrl?: string;
};

const initialState: UserState = {
  isLoading: false,
};

export const getInfo = createAsyncThunk(
  'user/getInfo',
  (_, { getState }) => makeRequest('user/getinfo', null, 'GET', (getState() as RootState).auth.token),
);

export const getAvatar = createAsyncThunk(
  'user/getavatar',
  (_, { getState }) => makeRequest('user/getavatar', null, 'GET', (getState() as RootState).auth.token),
);

export const updateAvatar = createAsyncThunk(
  'user/updateavatar',
  (file: ApiMethod['user/updateavatar'], { getState }) => makeRequest('user/updateavatar', file, 'FILE', (getState() as RootState).auth.token),
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
        state.email = payload.email;
        state.surname = payload.surname;
        state.name = payload.name;
        state.isLoading = false;
      });

    builder
      .addCase(getAvatar.pending, (state) => {
        state.error = undefined;
        state.isLoading = true;
      })
      .addCase(getAvatar.rejected, (state, { error }) => {
        state.error = error.message;
        state.isLoading = false;
      })
      .addCase(getAvatar.fulfilled, (state, { payload }) => {
        state.avatarUrl = payload.url[0]?.presignedUrl;
        state.isLoading = false;
      });

    builder
      .addCase(updateAvatar.pending, (state) => {
        state.error = undefined;
        state.isLoading = true;
      })
      .addCase(updateAvatar.rejected, (state, { error }) => {
        state.error = error.message;
        state.isLoading = false;
      })
      .addCase(updateAvatar.fulfilled, (state) => {
        state.isLoading = false;
      });
  },
});

export default userSlice.reducer;
