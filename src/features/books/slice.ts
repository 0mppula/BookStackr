import { createSlice } from '@reduxjs/toolkit';
import { createAsyncThunk } from '@reduxjs/toolkit';

import { db } from '../../config/firebase';
import { getDocs, collection, query, where, addDoc } from 'firebase/firestore';
import { books, bookType } from '../../assets/data/books';
import { addBookReqBodyType } from '../../components/FormComponents/FormTypes';

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
			// Get the user books from firestore and sort my ascending index order.
			const q = query(collection(db, 'books'), where('userId', '==', user.uid));
			const data = await getDocs(q);
			const filteredBookData = data.docs
				.map((doc) => ({ ...doc.data(), id: doc.id }))
				.sort((a: any, b: any) => (a.index > b.index ? 1 : -1));

			return filteredBookData;
		} else {
			// Get mock books and sort my ascending index order.
			return [...books].sort((a, b) => (a.index > b.index ? 1 : -1));
		}
	} catch (error) {
		return thunkAPI.rejectWithValue('Error fetching the books.');
	}
});

export const addBook = createAsyncThunk(
	'books/addBooks',
	async (formData: addBookReqBodyType, thunkAPI: any) => {
		try {
			const user = thunkAPI.getState().auth.user;

			if (user) {
				// Add a new book to the users firestore book collection.
				const booksCollectionRef = collection(db, 'books');
				let reqData: addBookReqBodyType = { ...formData, userId: user.uid };
				const docRef = await addDoc(booksCollectionRef, reqData);

				let newBook: bookType = { ...reqData, id: docRef.id };

				return newBook;
			} else {
				// Add a new book to the local state of the app.
				const fake_id = String(
					Math.random().toString(16).slice(2) + Math.random().toString(16).slice(6, 13)
				);

				let newBook: bookType = { ...formData, id: fake_id };

				return newBook;
			}
		} catch (error) {
			return thunkAPI.rejectWithValue('Error adding new book.');
		}
	}
);

export const booksSlice = createSlice({
	name: 'books',
	initialState,
	reducers: {
		setQuery: (state, action) => {
			state.query = action.payload;
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
			})
			.addCase(addBook.pending, (state) => {
				state.message = '';
				state.loading = true;
			})
			.addCase(addBook.fulfilled, (state, action) => {
				state.loading = false;
				state.books = [...state.books, action.payload];
			})
			.addCase(addBook.rejected, (state, action) => {
				state.loading = false;
				state.message = action.payload as string;
			});
	},
});

export const { setQuery, editBook } = booksSlice.actions;
export default booksSlice.reducer;
