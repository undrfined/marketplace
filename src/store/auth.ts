import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import makeRequest, { ApiMethod } from '../api/makeRequest';

type AuthState = {
  value: number;
};

const initialState: AuthState = {
  value: 0,
};

export const login = createAsyncThunk(
  'auth/login',
  (params: ApiMethod['login']) => makeRequest('login', params),
);

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    incrementByAmount: (state, action: PayloadAction<number>) => {
      state.value += action.payload;
    },
  },
  extraReducers: {
    [login.rejected.type]: (state, action) => {
      console.log('reject??', action);
    },
    [login.pending.type]: (state, action) => {
      console.log('pending??', action);
    },
    [login.fulfilled.type]: (state, action) => {
      console.log('wtf??', action);
      // state.value += action.payload;
    },
  },
});

export const { incrementByAmount } = authSlice.actions;

export default authSlice.reducer;
