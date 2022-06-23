import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import makeRequest from '../api/makeRequest';
import type { RootState } from './store';
import { ApiTag } from '../api/types/tag';

type TagsState = {
  isLoading: boolean;
  error?: string;
  tags: Record<number, ApiTag>;
};

const initialState: TagsState = {
  isLoading: false,
  tags: {},
};

export const getAllTags = createAsyncThunk(
  'tags/getalltags',
  (_, { getState }) => makeRequest('tags/getalltags', null, 'GET', (getState() as RootState).auth.token),
);

const tagsSlice = createSlice({
  name: 'tags',
  initialState,
  reducers: {
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllTags.pending, (state) => {
        state.error = undefined;
        state.isLoading = true;
      })
      .addCase(getAllTags.rejected, (state, { error }) => {
        state.error = error.message;
        state.isLoading = false;
      })
      .addCase(getAllTags.fulfilled, (state, { payload }) => {
        state.tags = payload.tags.reduce((acc: Record<number, ApiTag>, tag) => {
          acc[tag.id] = tag;
          return acc;
        }, {});
        state.isLoading = false;
      });
  },
});

export default tagsSlice.reducer;
