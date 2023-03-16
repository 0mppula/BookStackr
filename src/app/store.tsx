import { configureStore } from '@reduxjs/toolkit';
import booksReducer from '../features/books/BooksSlice';
import authReducer from '../features/auth/authSlice';

export const store = configureStore({
	reducer: { books: booksReducer, auth: authReducer },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
