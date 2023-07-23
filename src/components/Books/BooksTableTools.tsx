import { FC, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { setQuery, setStatusFilters, setYearReadFilter } from '../../features/books/slice';
import AddBookModal from '../Modals/AddBookModal';
import { FaBook, FaPlus } from 'react-icons/fa';
import {
	selectBookFilters,
	selectQueryFilteredBooks,
	selectYearReadFilters,
} from '../../features/books/selectors';
import { RootState } from '../../app/store';
import { bookStatusType } from '../../assets/data/books';
import CustomCheckbox from './CustomCheckbox';
import SelectInput from '../FormComponents/SelectInput';
import { selectItemType } from '../FormComponents/FormTypes';

const BooksTableTools: FC = () => {
	const [addModalOpen, setAddModalOpen] = useState<boolean>(false);
	const [internalQuery, setInternalQuery] = useState('');

	const books = useSelector((state: RootState) => selectQueryFilteredBooks(state));
	const { statusFilters, yearReadFilter } = useSelector((state: RootState) =>
		selectBookFilters(state)
	);
	const yearReadFilters = useSelector((state: RootState) => selectYearReadFilters(state));

	const dispatch = useDispatch();

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

	const handleSelectChange = (e: selectItemType, field: string) => {
		dispatch(setYearReadFilter(e));
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
				<div>
					<button className="btn-icon" onClick={() => setAddModalOpen(true)}>
						<FaPlus /> Add Book
					</button>
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

				<div className="year-filter">
					<SelectInput
						value={yearReadFilter}
						name="yearReadFilter"
						handleChange={handleSelectChange}
						options={yearReadFilters}
						placeholder="Select books by year..."
						errorPlaceholder={false}
					/>
				</div>

				<div className="query">
					<input
						type="search"
						placeholder="Search by title or author..."
						value={internalQuery}
						onChange={(e) => handleDebounce(e)}
					/>
				</div>
			</div>
		</>
	);
};

export default BooksTableTools;
