import { createSlice, createSelector } from '@reduxjs/toolkit';
import { RootState } from '../app/store';

import { books, bookType } from '../assets/data/books';

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
	},
});

export const booksStateSelector = (state: RootState) => state.books;
export const booksSelector = (state: RootState) => state.books.books;

export const selectQueryFilteredBooks = createSelector([booksStateSelector], (booksState) => {
	const { books, query } = booksState;

	const filteredBooks = books?.filter(
		(book) =>
			book.author.toLowerCase().includes(query.toLowerCase()) ||
			book.title.toLowerCase().includes(query.toLowerCase())
	);

	return filteredBooks;
});

export const selectBookById = createSelector(
	[booksSelector, (state, bookId: string | null) => bookId],
	(bookState, bookId) => {
		const book = books?.filter((book) => book.id === bookId)?.[0];

		return book;
	}
);

export const selectBooksCount = createSelector([booksSelector], (books) => {
	return books.reduce((a: number, b) => (a += 1), 0);
});

export const { setQuery, addBook } = booksSlice.actions;
export default booksSlice.reducer;
