import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';

export interface tableRowDataType {
	[key: string]: string | number;
}
export interface chartDataType {
	[key: string]: string[] | number[];
}

export interface categoryCountDataType {
	[key: string]: number;
}

export const booksStateSelector = (state: RootState) => state.books;
export const booksSelector = (state: RootState) => state.books.books;
const booksLoadingSelector = (state: RootState) => state.books.loading;

export const selectbooksLoadingState = createSelector([booksLoadingSelector], (loadingState) => {
	return loadingState;
});

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
		const book = bookState?.filter((book) => book.id === bookId)?.[0];

		return book;
	}
);

export const selectMaxBookIndex = createSelector([booksSelector], (books) => {
	return Math.max(...books.map((book) => book.index));
});

export const selectReadBooksCount = createSelector([booksSelector], (books) => {
	const booksRead = books
		.filter((book) => book.status === 'read')
		.reduce((a: number) => (a += 1), 0);

	return booksRead;
});

export const selectReadBooksDataByMedium = createSelector([booksSelector], (books) => {
	const readBooks = books.filter((book) => book.status === 'read');

	let totalBooks: number = readBooks?.length;
	let audioBooks: number = 0;
	let eBooks: number = 0;
	let paperBooks: number = 0;
	let audioBooksPercent: string = '';
	let eBooksPercent: string = '';
	let paperBooksPercent: string = '';

	readBooks.forEach((book) => {
		if (book.readingMedium === 'audio') {
			audioBooks++;
		}
		if (book.readingMedium === 'e-book') {
			eBooks++;
		}
		if (book.readingMedium === 'paper') {
			paperBooks++;
		}
	});

	audioBooksPercent = totalBooks ? `${((audioBooks / totalBooks) * 100).toFixed(2)}%` : '0.00%';
	eBooksPercent = totalBooks ? `${((eBooks / totalBooks) * 100).toFixed(2)}%` : '0.00%';
	paperBooksPercent = totalBooks ? `${((paperBooks / totalBooks) * 100).toFixed(2)}%` : '0.00%';

	return {
		totalBooks,
		audioBooks,
		eBooks,
		paperBooks,
		audioBooksPercent,
		eBooksPercent,
		paperBooksPercent,
	};
});

export const selectReadBooksChartTableData = createSelector([booksSelector], (books) => {
	// Only check read books.
	const readBooks = books.filter((book) => book.status === 'read');

	const tableData: tableRowDataType[] = [];
	const chartData: chartDataType = {};

	const totalBooksReadByYear: number[] = [];
	const audioBooksReadByYear: number[] = [];
	const eBooksReadByYear: number[] = [];
	const paperBooksReadByYear: number[] = [];
	const eBooksPercentByYear: string[] = [];
	const audioPercentByYear: string[] = [];
	const paperPercentByYear: string[] = [];
	const booksPerWeekByYear: string[] = [];

	const uniqueYears = readBooks
		.filter((book, i) => readBooks.findIndex((book2) => book2.yearRead === book.yearRead) === i)
		.map((book) => book.yearRead)
		.sort((a, b) => (a > b ? 1 : -1));

	// Store total books read by year and by year and medium.
	uniqueYears.forEach((uniqueYear, i) => {
		let currYtotalBooksRead = 0;
		let currYtotalAudioBooksRead = 0;
		let currYtotalEBooksRead = 0;
		let currYtotalPaperBooksRead = 0;

		readBooks.forEach((book) => {
			if (book.yearRead === uniqueYear) {
				currYtotalBooksRead++;
			}

			if (book.readingMedium === 'audio' && book.yearRead === uniqueYear) {
				currYtotalAudioBooksRead++;
			}

			if (book.readingMedium === 'e-book' && book.yearRead === uniqueYear) {
				currYtotalEBooksRead++;
			}

			if (book.readingMedium === 'paper' && book.yearRead === uniqueYear) {
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
	let daysElapsed = +Math.floor((todayTime - startOfYearTime) / (24 * 60 * 60 * 1000));

	// Store total books read per week by year and the percent of each book medium read by year.
	uniqueYears.forEach((uniqueYear, i) => {
		let weeksElapsedOnYear = 52;

		if (uniqueYear === currentYear) {
			weeksElapsedOnYear = Math.ceil(daysElapsed / 7);
		}

		booksPerWeekByYear[i] = (
			(audioBooksReadByYear[i] + eBooksReadByYear[i] + paperBooksReadByYear[i]) /
			weeksElapsedOnYear
		).toFixed(2);

		audioPercentByYear[i] = `${(
			(audioBooksReadByYear[i] / totalBooksReadByYear[i]) *
			100
		).toFixed(2)}%`;

		eBooksPercentByYear[i] = `${((eBooksReadByYear[i] / totalBooksReadByYear[i]) * 100).toFixed(
			2
		)}%`;

		paperPercentByYear[i] = `${(
			(paperBooksReadByYear[i] / totalBooksReadByYear[i]) *
			100
		).toFixed(2)}%`;
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
	uniqueYears.forEach((_, i) => {
		tableData[i] = {};

		dataFields.forEach((dataField, fieldIndex) => {
			tableData[i][dataField as keyof tableRowDataType] = bookDataByYear[fieldIndex][i];
		});
	});

	// Add a key for each by year book data point to the chartData object.
	dataFields.forEach((dataField, fieldIndex) => {
		chartData[dataField as keyof chartDataType] = bookDataByYear[fieldIndex];
	});

	return { tableData, chartData };
});

export const selectReadBooksCategoriesChartData = createSelector([booksSelector], (books) => {
	const readBooks = books.filter((book) => book.status === 'read');
	const categoryCountData: categoryCountDataType = {};
	let categories: string[] = [];
	let categoryCounts: number[] = [];

	readBooks.forEach((book) => {
		// Iterate over each books categories.
		book.category.forEach((category) => {
			if (category in categoryCountData) {
				// Count each category and place it in the corresponding category key of "categoryCountData".
				categoryCountData[category]++;
			} else {
				// Initialize a new category key with a value of 1.
				categoryCountData[category] = 1;
			}
		});
	});

	// Sort the categories and categoryCounts by descending prevelancy.
	categories = Object.keys(categoryCountData).sort(
		(a, b) => categoryCountData[b] - categoryCountData[a]
	);
	categoryCounts = categories.map((category) => categoryCountData[category]);
	// Capitalize the categories.
	categories = categories.map((category) => {
		let categoryWords = category.split(' ');
		let capitalizedCategory = categoryWords
			.map((cw) => cw[0].toUpperCase() + cw.substring(1))
			.join(' ');

		return capitalizedCategory;
	});

	return { categories, categoryCounts };
});
