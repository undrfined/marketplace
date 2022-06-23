import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { ApiMethod } from '../api/types';
import makeRequest from '../api/makeRequest';
import type { RootState } from './store';
import { ApiGood } from '../api/types/goods';
import { ApiTag } from '../api/types/tag';

type SearchState = {
  isLoading?: boolean;
  error?: string;
  goods?: Record<number, ApiGood>;
  tags?: Record<number, ApiTag>;
};

const initialState: SearchState = {
};

export const searchGoods = createAsyncThunk(
  'search/searchGoods',
  (params: ApiMethod['goods/getgoods'], { getState }) => makeRequest('goods/getgoods', params, 'POST', (getState() as RootState).auth.token),
);

const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    clearSearch: (state) => {
      state.goods = undefined;
      state.tags = undefined;
      state.isLoading = true;
      state.error = undefined;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(searchGoods.pending, (state) => {
        state.error = undefined;
        state.goods = {};
        state.tags = {};
        state.isLoading = true;
      })
      .addCase(searchGoods.rejected, (state, { error }) => {
        state.error = error.message;
        state.isLoading = false;
      })
      .addCase(searchGoods.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.goods = payload.goods.reduce((acc: Record<number, ApiGood>, good) => {
          acc[good.id] = good;
          return acc;
        }, {});
        state.tags = payload.tags.reduce((acc: Record<number, ApiTag>, tag) => {
          acc[tag.id] = tag;
          return acc;
        }, {});
      });
  }
});

export const { clearSearch } = searchSlice.actions;

export default searchSlice.reducer;
