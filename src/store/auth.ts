import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import makeRequest, { ApiMethod } from '../api/makeRequest';

type AuthState = {
  isLoading: boolean;
  error?: string;
  token?: string;
  refreshToken?: string;
};

const initialState: AuthState = {
  isLoading: false,
  token: localStorage.getItem('token') || undefined,
  refreshToken: localStorage.getItem('refreshToken') || undefined,
};

export const login = createAsyncThunk(
  'auth/login',
  (params: ApiMethod['login']) => makeRequest('login', params),
);

export const signUp = createAsyncThunk(
  'auth/signUp',
  (params: ApiMethod['signUp']) => makeRequest('signUp', params),
);

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logOut: (state) => {
      state.token = undefined;
      state.refreshToken = undefined;
      localStorage.clear();
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.error = undefined;
        state.isLoading = true;
      })
      .addCase(login.rejected, (state, { error }) => {
        state.error = error.message;
        state.isLoading = false;
      })
      .addCase(login.fulfilled, (state, { payload }) => {
        state.token = payload.token;
        state.refreshToken = payload.refreshToken;
        localStorage.setItem('token', payload.token);
        localStorage.setItem('refreshToken', payload.refreshToken);
        state.isLoading = false;
      });

    builder
      .addCase(signUp.pending, (state) => {
        state.error = undefined;
        state.isLoading = true;
      })
      .addCase(signUp.rejected, (state, { error }) => {
        state.error = error.message;
        state.isLoading = false;
      })
      .addCase(signUp.fulfilled, (state) => {
        // TODO token
        state.isLoading = false;
      });
  },
});

export const { logOut } = authSlice.actions;

export default authSlice.reducer;
