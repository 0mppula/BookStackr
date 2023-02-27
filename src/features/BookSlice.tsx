import { createSlice } from '@reduxjs/toolkit';

import { books } from '../assets/data/books';
import { bookType } from '../assets/interfaces/interfaces';

export interface bookStateType {
	books: bookType[];
}

const initialState: bookStateType = {
	books,
};

export const bookSlice = createSlice({
	name: 'book',
	initialState,
	reducers: {},
});

export default bookSlice.reducer;
