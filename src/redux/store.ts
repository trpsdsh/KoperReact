import { configureStore } from '@reduxjs/toolkit';

import filter from './slices/filterSlice';
import cart from './slices/cartSlice';
import books from './slices/booksSlice';
import quiz from './slices/quizSlice';
import { useDispatch } from 'react-redux';

export const store = configureStore({
  reducer: {
    filter,
    cart,
    books,
    quiz,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
