import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import makeRequest from '../api/makeRequest';
import type { RootState } from './store';
import { ApiMethod } from '../api/types';
import { ApiGood } from '../api/types/goods';

type GoodsState = {
  isLoading: boolean;
  error?: string;
  goods: Record<number, ApiGood>;
};

const initialState: GoodsState = {
  isLoading: false,
  goods: {},
};

export const getGoods = createAsyncThunk(
  'goods/getgoods',
  (params: ApiMethod['goods/getgoods'], { getState }) => makeRequest('goods/getgoods', params, 'POST', (getState() as RootState).auth.token),
);

const goodsSlice = createSlice({
  name: 'goods',
  initialState,
  reducers: {
  },
  extraReducers: (builder) => {
    builder
      .addCase(getGoods.pending, (state) => {
        state.error = undefined;
        state.isLoading = true;
      })
      .addCase(getGoods.rejected, (state, { error }) => {
        state.error = error.message;
        state.isLoading = false;
      })
      .addCase(getGoods.fulfilled, (state, { payload }) => {
        console.log(payload);
        state.goods = payload.goods.reduce((acc: Record<number, ApiGood>, good) => {
          acc[good.id] = good;
          return acc;
        }, {});
        state.isLoading = false;
      });
  },
});

export default goodsSlice.reducer;
