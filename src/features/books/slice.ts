import { createSlice } from '@reduxjs/toolkit';
import { createAsyncThunk } from '@reduxjs/toolkit';

import { db } from '../../config/firebase';
import { getDocs, collection, query, where } from 'firebase/firestore';
import { books, bookType } from '../../assets/data/books';

interface booksStateType {
	books: bookType[];
	query: string;
	loading: boolean;
	message: string;
}

const initialState: booksStateType = {
	books: [],
	query: '',
	loading: true,
	message: '',
};

export const getBooks = createAsyncThunk('books/getBooks', async (_: undefined, thunkAPI: any) => {
	try {
		const user = thunkAPI.getState().auth.user;

		if (user) {
			// Get the user books from firestore.
			const q = query(collection(db, 'books'), where('userId', '==', user.uid));
			const data = await getDocs(q);
			const filteredBookData = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));

			return filteredBookData;
		} else {
			// Get mock books.
			return books;
		}
	} catch (error) {
		return thunkAPI.rejectWithValue('Error fetching the books.');
	}
});

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
	extraReducers: (builder) => {
		builder
			.addCase(getBooks.pending, (state) => {
				state.message = '';
				state.loading = true;
			})
			.addCase(getBooks.fulfilled, (state, action) => {
				state.loading = false;
				state.books = action.payload;
			})
			.addCase(getBooks.rejected, (state, action) => {
				state.loading = false;
				state.message = action.payload as string;
			});
	},
});

export const { setQuery, addBook, editBook } = booksSlice.actions;
export default booksSlice.reducer;
