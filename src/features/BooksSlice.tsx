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
		editBook: (state, action) => {
			let updatedBooks = [...state.books].filter((book) => book.id !== action.payload.id);

			state.books = [...updatedBooks, action.payload].sort((a, b) => a.index - b.index);
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
	return books.reduce((a: number) => (a += 1), 0);
});

export const selectReadBooksCount = createSelector([booksSelector], (books) => {
	const booksRead = books
		.filter((book) => book.status === 'read')
		.reduce((a: number) => (a += 1), 0);

	return booksRead;
});

export const selectReadBooksCountByMedium = createSelector([booksSelector], (books) => {
	const audioBooksRead = books
		.filter((book) => book.readingMedium === 'audio' && book.status === 'read')
		.reduce((a: number) => (a += 1), 0);
	const eBooksRead = books
		.filter((book) => book.readingMedium === 'e-book' && book.status === 'read')
		.reduce((a: number) => (a += 1), 0);
	const paperBooksRead = books
		.filter((book) => book.readingMedium === 'paper' && book.status === 'read')
		.reduce((a: number) => (a += 1), 0);

	return { audioBooksRead, eBooksRead, paperBooksRead };
});

export const selectBooksStatsTableData = createSelector([booksSelector], (books) => {
	const tableData: any = {};

	const totalBooksReadByYear: number[] = [];
	const audioBooksReadByYear: number[] = [];
	const eBooksReadByYear: number[] = [];
	const paperBooksReadByYear: number[] = [];
	const eBooksPercentByYear: string[] = [];
	const audioPercentByYear: string[] = [];
	const paperPercentByYear: string[] = [];
	const booksPerWeekByYear: number[] = [];

	const uniqueYears = books
		.filter((book, i) => books.findIndex((book2) => book2.yearRead === book.yearRead) === i)
		.map((book) => book.yearRead);

	// Store total books read by year and by year and medium.
	uniqueYears.forEach((uniqueYear, i) => {
		let currYtotalBooksRead = 0;
		let currYtotalAudioBooksRead = 0;
		let currYtotalEBooksRead = 0;
		let currYtotalPaperBooksRead = 0;

		books.forEach((book) => {
			if (book.yearRead === uniqueYear && book.status === 'read') {
				currYtotalBooksRead++;
			}

			if (
				book.readingMedium === 'audio' &&
				book.yearRead === uniqueYear &&
				book.status === 'read'
			) {
				currYtotalAudioBooksRead++;
			}

			if (
				book.readingMedium === 'e-book' &&
				book.yearRead === uniqueYear &&
				book.status === 'read'
			) {
				currYtotalEBooksRead++;
			}

			if (
				book.readingMedium === 'paper' &&
				book.yearRead === uniqueYear &&
				book.status === 'read'
			) {
				currYtotalPaperBooksRead++;
			}
		});

		totalBooksReadByYear[i] = currYtotalBooksRead;
		audioBooksReadByYear[i] = currYtotalAudioBooksRead;
		eBooksReadByYear[i] = currYtotalEBooksRead;
		paperBooksReadByYear[i] = currYtotalPaperBooksRead;
	});

	let todayTime = new Date().getTime();
	let currentYear = new Date().getFullYear();
	let startOfYearTime = new Date(currentYear, 0, 1).getTime();
	let weeksElapsedOnYear = 52;
	let daysElapsed = Math.floor((todayTime - startOfYearTime) / (24 * 60 * 60 * 1000));

	// Store total books read per week by year and the percent of each book medium read by year.
	uniqueYears.forEach((uniqueYear, i) => {
		if (uniqueYear === currentYear) {
			weeksElapsedOnYear = Math.ceil(daysElapsed / 7);
		}

		booksPerWeekByYear[i] = +(
			(audioBooksReadByYear[i] + eBooksReadByYear[i] + paperBooksReadByYear[i]) /
			weeksElapsedOnYear
		).toFixed(2);

		audioPercentByYear[i] = `${(
			(audioBooksReadByYear[i] / totalBooksReadByYear[i]) *
			100
		).toFixed(1)}%`;

		eBooksPercentByYear[i] = `${((eBooksReadByYear[i] / totalBooksReadByYear[i]) * 100).toFixed(
			1
		)}%`;

		paperPercentByYear[i] = `${(
			(paperBooksReadByYear[i] / totalBooksReadByYear[i]) *
			100
		).toFixed(1)}%`;
	});

	const dataFields: string[] = [
		'years',
		'totalBooksReadByYear',
		'audioBooksReadByYear',
		'eBooksReadByYear',
		'paperBooksReadByYear',
		'eBooksPercentByYear',
		'audioPercentByYear',
		'paperPercentByYear',
		'booksPerWeekByYear',
	];

	const bookDataByYear: (number[] | string[])[] = [
		uniqueYears,
		totalBooksReadByYear,
		audioBooksReadByYear,
		eBooksReadByYear,
		paperBooksReadByYear,
		eBooksPercentByYear,
		audioPercentByYear,
		paperPercentByYear,
		booksPerWeekByYear,
	];

	// Map for each unique year a object with that years data.
	dataFields.forEach((dataField, fieldIndex) => {
		tableData[dataField] = bookDataByYear[fieldIndex];
	});

	return tableData;
});

export const { setQuery, addBook, editBook } = booksSlice.actions;
export default booksSlice.reducer;
