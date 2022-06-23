import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type GoodsState = {
  // id -> count
  items: Record<number, number>;
};

const initialState: GoodsState = {
  items: {}
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart(state, action: PayloadAction<number>) {
      state.items[action.payload] = (state.items[action.payload] ?? 0) + 1;
    },
    removeFromCart(state, action: PayloadAction<number>) {
      state.items[action.payload] = (state.items[action.payload] ?? 1) - 1;
    },
  },
});

export const { addToCart, removeFromCart } = cartSlice.actions;

export default cartSlice.reducer;
