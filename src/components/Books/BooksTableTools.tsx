import { format } from 'date-fns';
import { FC, useEffect, useState } from 'react';
import { CSVLink } from 'react-csv';
import { FaBook, FaCircleNotch, FaFileDownload, FaPlus } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../app/store';
import { bookStatusType } from '../../assets/data/books';
import {
	selectBookFilters,
	selectQueryFilteredBooks,
	selectBooksTableSelectFilterOptions,
} from '../../features/books/selectors';
import {
	setQuery,
	setStatusFilters,
	setYearReadFilters,
	setCategoryFilters,
} from '../../features/books/slice';
import { selectItemType } from '../FormComponents/FormTypes';
import SelectInput from '../FormComponents/SelectInput';
import AddBookModal from '../Modals/AddBookModal';
import CustomCheckbox from './CustomCheckbox';

const BooksTableTools: FC = () => {
	const [canGenerateCSV, setCanGenerateCSV] = useState(true);
	const [addModalOpen, setAddModalOpen] = useState<boolean>(false);
	const [internalQuery, setInternalQuery] = useState('');

	const books = useSelector((state: RootState) => selectQueryFilteredBooks(state));
	const { statusFilters, yearReadFilters, categoryFilters } = useSelector((state: RootState) =>
		selectBookFilters(state)
	);
	const { yearReadFilterOptions, categoryFilterOptions } = useSelector((state: RootState) =>
		selectBooksTableSelectFilterOptions(state)
	);

	const dispatch = useDispatch();

	const defaultYearReadFilterIsSelected = yearReadFilters.some((filter) => filter.value === null);
	const defaultCategoryFilterIsSelected = categoryFilters.some((filter) => filter.value === null);

	useEffect(() => {
		let bounce = setTimeout(() => {
			dispatch(setQuery(internalQuery));
		}, 250);

		return () => clearTimeout(bounce);
	}, [internalQuery]);

	const handleDebounce = (e: React.ChangeEvent<HTMLInputElement>) => {
		setInternalQuery(e.target.value);
	};

	const handleStatusFilter = (e: React.ChangeEvent<HTMLInputElement>) => {
		let filterName = e.target.name as bookStatusType;
		let toggled = statusFilters.includes(filterName);
		let newFilters = toggled
			? [...statusFilters].filter((f) => f !== filterName)
			: [...statusFilters, filterName];

		dispatch(setStatusFilters(newFilters));
	};

	const handleSelectMultiChange = (e: selectItemType[], field: string) => {
		if (e.length === 0 && field === 'yearReadFilter') {
			dispatch(setYearReadFilters([{ label: 'All years', value: null }]));
			return;
		}

		if (e.length === 0 && field === 'categoryFilter') {
			dispatch(setCategoryFilters([{ label: 'All categories', value: null }]));
			return;
		}

		// Remove the default option when a filter is selected.
		if (e.some((option) => option.value !== null)) {
			e = e.filter((option) => option.value !== null);
		}

		if (field === 'categoryFilter') {
			dispatch(setCategoryFilters(e));
		}

		if (field === 'yearReadFilter') {
			dispatch(setYearReadFilters(e));
		}
	};

	const generateCSVData = () => {
		const headers = ['#', 'Autor', 'Title', 'Category', 'Medium', 'Year', 'Status'];

		const rows = books.map((book, index) => {
			return [
				index + 1,
				book.author,
				book.title,
				book.category
					.map((category) =>
						category
							.split(' ')
							.map((word) => word[0].toUpperCase() + word.slice(1))
							.join(' ')
					)
					.join(', '),
				book.readingMedium,
				book.yearRead,
				book.status,
			];
		});

		return [headers, ...rows];
	};

	const toggleCSVRateLimit = () => {
		setCanGenerateCSV(false);

		setTimeout(() => {
			setCanGenerateCSV(true);
		}, 1000);
	};

	return (
		<>
			<AddBookModal modalOpen={addModalOpen} setModalOpen={setAddModalOpen} />

			<div
				className="book-count"
				title={`${books.length} ${books.length === 1 ? 'book' : 'books'}`}
			>
				{books.length} <FaBook style={{ fontSize: '90%' }} />
			</div>

			<div className="table-tools">
				<div className="query">
					<input
						type="search"
						placeholder="Search by title or author..."
						value={internalQuery}
						onChange={(e) => handleDebounce(e)}
					/>
				</div>

				<div
					className={`year-filter ${
						defaultYearReadFilterIsSelected ? 'disabled-first-select-option' : ''
					}`}
				>
					<SelectInput
						value={yearReadFilters}
						name="yearReadFilter"
						handleChange={handleSelectMultiChange}
						options={yearReadFilterOptions}
						placeholder="Select books by year..."
						errorPlaceholder={false}
						isSearchable
						isMulti
					/>
				</div>

				<div
					className={`category-filter ${
						defaultCategoryFilterIsSelected ? 'disabled-first-select-option' : ''
					}`}
				>
					<SelectInput
						value={categoryFilters}
						name="categoryFilter"
						handleChange={handleSelectMultiChange}
						options={categoryFilterOptions}
						placeholder="Select books by category..."
						errorPlaceholder={false}
						isSearchable
						isMulti
					/>
				</div>

				<div className="filters">
					<CustomCheckbox
						label="Read"
						name="read"
						onChange={(e) => handleStatusFilter(e)}
						checked={statusFilters.some((filter) => filter === 'read')}
					/>

					<CustomCheckbox
						label="Reading"
						name="reading"
						onChange={(e) => handleStatusFilter(e)}
						checked={statusFilters.some((filter) => filter === 'reading')}
					/>

					<CustomCheckbox
						label="Want to read"
						name="want to read"
						onChange={(e) => handleStatusFilter(e)}
						checked={statusFilters.some((filter) => filter === 'want to read')}
					/>
				</div>

				<div className="buttons">
					<CSVLink
						tabIndex={canGenerateCSV ? 0 : -1}
						aria-disabled={!canGenerateCSV}
						onClick={toggleCSVRateLimit}
						data={generateCSVData()}
						filename={`books-${format(Date.now(), 'dd-MM-yyyy')}.csv`}
						className={`btn btn-icon ${!canGenerateCSV ? 'disabled' : ''}`}
						target="_blank"
					>
						{canGenerateCSV ? (
							<FaFileDownload />
						) : (
							<span className="spin">
								<FaCircleNotch />
							</span>
						)}{' '}
						.csv
					</CSVLink>

					<button className="btn-icon" onClick={() => setAddModalOpen(true)}>
						<FaPlus /> Add Book
					</button>
				</div>
			</div>
		</>
	);
};

export default BooksTableTools;
