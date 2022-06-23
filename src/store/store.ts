import { configureStore } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import auth from './auth';
import user from './user';
import tags from './tags';
import goods from './goods';
import cart from './cart';

const store = configureStore({
  reducer: {
    auth,
    user,
    tags,
    goods,
    cart,
  },
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
