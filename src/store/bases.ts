import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import makeRequest from '../api/makeRequest';
import type { RootState } from './store';
import { ApiBase } from '../api/types/bases';

type BasesState = {
  isLoading: boolean;
  error?: string;
  bases: Record<number, ApiBase>;
};

const initialState: BasesState = {
  isLoading: false,
  bases: {},
};

export const getAllBases = createAsyncThunk(
  'bases/getallbases',
  (_, { getState }) => makeRequest('bases/getallbases', null, 'GET', (getState() as RootState).auth.token),
);

const basesSlice = createSlice({
  name: 'bases',
  initialState,
  reducers: {
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllBases.pending, (state) => {
        state.error = undefined;
        state.isLoading = true;
      })
      .addCase(getAllBases.rejected, (state, { error }) => {
        state.error = error.message;
        state.isLoading = false;
      })
      .addCase(getAllBases.fulfilled, (state, { payload }) => {
        state.bases = payload.bases.reduce((acc: Record<number, ApiBase>, base) => {
          acc[base.id] = base;
          return acc;
        }, {});
        state.isLoading = false;
      });
  },
});

export default basesSlice.reducer;
