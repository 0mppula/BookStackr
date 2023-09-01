import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import {
	addDoc,
	collection,
	deleteDoc,
	doc,
	getDocs,
	orderBy,
	query,
	updateDoc,
	where,
} from 'firebase/firestore';
import { bookStatusType, bookType, books } from '../../assets/data/books';
import {
	addBookReqBodyType,
	editBookReqBodyType,
	selectItemType,
} from '../../components/FormComponents/FormTypes';
import { db } from '../../config/firebase';

interface booksStateType {
	books: bookType[];
	query: string;
	statusFilters: bookStatusType[];
	yearReadFilters: selectItemType[];
	categoryFilters: selectItemType[];
	loading: boolean;
	message: string;
	error: string;
}

const initialState: booksStateType = {
	books: [],
	query: '',
	statusFilters: ['read', 'want to read', 'reading'],
	yearReadFilters: [{ label: 'All years', value: null }],
	categoryFilters: [{ label: 'All categories', value: null }],
	loading: true,
	message: '',
	error: '',
};

export const getBooks = createAsyncThunk('books/getBooks', async (_: undefined, thunkAPI: any) => {
	try {
		const user = thunkAPI.getState().auth.user;

		if (user) {
			// Get the user books from firestore and sort my ascending index order.
			const q = query(collection(db, 'books'), where('userId', '==', user.uid));
			const data = await getDocs(q);

			const filteredBookData: bookType[] = data.docs
				.map((doc) => ({
					id: doc.id,
					...({ ...doc.data(), category: [...doc.data().category].sort() } as Omit<
						bookType,
						'id'
					>),
				}))
				.sort((a, b) => (a.index > b.index ? 1 : -1));

			return filteredBookData;
		} else {
			// Get mock books and sort my ascending index order.
			return [...books]
				.sort((a, b) => (a.index > b.index ? 1 : -1))
				.map((book) => ({ ...book, category: book.category.sort() }));
		}
	} catch (error) {
		return thunkAPI.rejectWithValue('Error occurred fetching the books.');
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

				// Add userId to the document.
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
			return thunkAPI.rejectWithValue('Error occurred adding new book.');
		}
	}
);

export const editBook = createAsyncThunk(
	'books/editBook',
	async (formData: editBookReqBodyType, thunkAPI: any) => {
		try {
			const user = thunkAPI.getState().auth.user;

			if (user) {
				// Edit a book in the users firestore book collection.
				const bookDoc = doc(db, 'books', formData.id);

				// Add userId to the document.
				let updatedBook: bookType = { ...formData, userId: user.uid };

				await updateDoc(bookDoc, { ...updatedBook });

				return updatedBook;
			} else {
				// Edit a book in the local state of the app.
				return formData;
			}
		} catch (error) {
			return thunkAPI.rejectWithValue('Error occurred editing the book.');
		}
	}
);

export const deleteBook = createAsyncThunk(
	'books/deleteBook',
	async (bookId: string, thunkAPI: any) => {
		try {
			const user = thunkAPI.getState().auth.user;

			if (user) {
				// Delete a book from the users firestore book collection.
				const bookDoc = doc(db, 'books', bookId);

				await deleteDoc(bookDoc);

				return bookId;
			} else {
				// Delete a book from the local state of the app.
				return bookId;
			}
		} catch (error) {
			return thunkAPI.rejectWithValue('Error occurred deleting the book.');
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
		setStatusFilters: (state, action) => {
			state.statusFilters = action.payload;
		},
		setYearReadFilters: (state, action) => {
			state.yearReadFilters = action.payload;
		},
		setCategoryFilters: (state, action) => {
			state.categoryFilters = action.payload;
		},
		resetMessageAndError: (state) => {
			state.message = '';
			state.error = '';
		},
		resetAllFilters: (state) => {
			state.query = '';
			state.statusFilters = ['read', 'want to read', 'reading'];
			state.yearReadFilters = [{ label: 'All years', value: null }];
			state.categoryFilters = [{ label: 'All categories', value: null }];
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(getBooks.pending, (state) => {
				state.error = '';
				state.message = '';
				state.loading = true;
			})
			.addCase(getBooks.fulfilled, (state, action) => {
				state.loading = false;
				state.books = action.payload;
			})
			.addCase(getBooks.rejected, (state, action) => {
				state.loading = false;
				state.error = action.payload as string;
			})
			.addCase(addBook.pending, (state) => {
				state.error = '';
				state.message = '';
				state.loading = true;
			})
			.addCase(addBook.fulfilled, (state, action) => {
				state.loading = false;
				state.books = [...state.books, action.payload];
				state.message = 'Book added.';
			})
			.addCase(addBook.rejected, (state, action) => {
				state.loading = false;
				state.error = action.payload as string;
			})
			.addCase(editBook.pending, (state) => {
				state.error = '';
				state.message = '';
				state.loading = true;
			})
			.addCase(editBook.fulfilled, (state, action) => {
				let updatedBooks = [...state.books].filter((book) => book.id !== action.payload.id);

				state.loading = false;
				state.books = [...updatedBooks, action.payload].sort((a, b) => a.index - b.index);
				state.message = 'Book updated.';
			})
			.addCase(editBook.rejected, (state, action) => {
				state.loading = false;
				state.error = action.payload as string;
			})
			.addCase(deleteBook.pending, (state) => {
				state.error = '';
				state.message = '';
				state.loading = true;
			})
			.addCase(deleteBook.fulfilled, (state, action) => {
				state.loading = false;
				state.books = [...state.books].filter((book) => book.id !== action.payload);
				state.message = 'Book deleted.';
			})
			.addCase(deleteBook.rejected, (state, action) => {
				state.loading = false;
				state.error = action.payload as string;
			});
	},
});

export const {
	setQuery,
	resetMessageAndError,
	setStatusFilters,
	setYearReadFilters,
	setCategoryFilters,
	resetAllFilters,
} = booksSlice.actions;
export default booksSlice.reducer;
