import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type CartState = {
  // id -> count
  items: Record<number, number>;
};

const initialState: CartState = {
  items: JSON.parse(localStorage.getItem('cart') || '{}'),
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart(state, action: PayloadAction<number>) {
      state.items[action.payload] = (state.items[action.payload] ?? 0) + 1;
      localStorage.setItem('cart', JSON.stringify(state.items));
    },
    removeFromCart(state, action: PayloadAction<number>) {
      state.items[action.payload] = (state.items[action.payload] ?? 1) - 1;
      localStorage.setItem('cart', JSON.stringify(state.items));
    },
    removeAll(state, action: PayloadAction<number>) {
      state.items[action.payload] = 0;
      localStorage.setItem('cart', JSON.stringify(state.items));
    },
  },
});

export const { addToCart, removeFromCart, removeAll } = cartSlice.actions;

export default cartSlice.reducer;
