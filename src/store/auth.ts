import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import jwtDecode from 'jwt-decode';
import makeRequest from '../api/makeRequest';
import { ApiJwtPayload, ApiMethod } from '../api/types';
import type { RootState } from './store';

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

export const refreshToken = createAsyncThunk(
  'auth/refreshToken',
  async (_, { getState }) => makeRequest('refreshtoken', {
    accessToken: localStorage.getItem('token') || '',
    refreshToken: localStorage.getItem('refreshToken') || '',
  }, 'POST', (getState() as RootState).auth.token)
);

export const startTokenCheck = createAsyncThunk(
  'auth/startTokenCheck',
  (token: string, { dispatch }) => {
    const decoded = jwtDecode<ApiJwtPayload>(token);
    const diff = decoded.exp * 1000 - Date.now();
    if (diff < 0) {
      dispatch(refreshToken());
    } else {
      setTimeout(() => {
        dispatch(refreshToken());
      }, diff - 5000);
    }
  }
);

export const login = createAsyncThunk('auth/login', (params: ApiMethod['login']) => makeRequest('login', params, 'POST'));

export const signUp = createAsyncThunk(
  'auth/signUp',
  (params: ApiMethod['signUp']) => makeRequest('signUp', params, 'POST'),
);

export const revokeToken = createAsyncThunk(
  'auth/revokeToken',
  (_, { getState }) => makeRequest('revoke', null, 'POST', (getState() as RootState).auth.token),
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
      .addCase(signUp.fulfilled, (state, { payload }) => {
        state.token = payload.token;
        state.refreshToken = payload.refreshToken;
        localStorage.setItem('token', payload.token);
        localStorage.setItem('refreshToken', payload.refreshToken);
        state.isLoading = false;
      });

    builder
      .addCase(refreshToken.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(refreshToken.rejected, (state, { error }) => {
        state.error = error.message;
        state.isLoading = false;
      })
      .addCase(refreshToken.fulfilled, (state, { payload }) => {
        state.token = payload.token;
        state.refreshToken = payload.refreshToken;
        localStorage.setItem('token', payload.token);
        localStorage.setItem('refreshToken', payload.refreshToken);
        state.isLoading = false;
      });
  },
});

export const { logOut } = authSlice.actions;

export default authSlice.reducer;
