import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import makeRequest from '../api/makeRequest';
import type { RootState } from './store';
import { ApiMethod } from '../api/types';
import { ApiGood } from '../api/types/goods';

type GoodsState = {
  isLoading: boolean;
  error?: string;
  goodsByTagId: Record<number, {
    goods: Record<number, ApiGood>;
    isEnd?: boolean;
  }>;
};

const initialState: GoodsState = {
  isLoading: false,
  goodsByTagId: {},
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
      .addCase(getGoods.fulfilled, (state, { payload, meta }) => {
        const result = payload.goods.reduce((acc: Record<number, ApiGood>, good) => {
          acc[good.id] = good;
          return acc;
        }, {});

        state.goodsByTagId[meta.arg.category] = {
          goods: {
            ...(state.goodsByTagId[meta.arg.category]?.goods || {}),
            ...result,
          },
          isEnd: Object.keys(result).length === 0,
        };
        state.isLoading = false;
      });
  },
});

export default goodsSlice.reducer;
