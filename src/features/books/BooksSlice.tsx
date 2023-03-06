import { createSlice } from '@reduxjs/toolkit';

import { books, bookType } from '../../assets/data/books';

export interface booksStateType {
	books: bookType[];
	query: string;
}

const initialState: booksStateType = {
	books,
	query: '',
};

export const booksSlice = createSlice({
	name: 'books',
	initialState,
	reducers: {
		setQuery: (state, action) => {
			state.query = action.payload;
		},
		addBook: (state, action) => {
			state.books = [...state.books, action.payload];
		},
		editBook: (state, action) => {
			let updatedBooks = [...state.books].filter((book) => book.id !== action.payload.id);

			state.books = [...updatedBooks, action.payload].sort((a, b) => a.index - b.index);
		},
	},
});

export const { setQuery, addBook, editBook } = booksSlice.actions;
export default booksSlice.reducer;
