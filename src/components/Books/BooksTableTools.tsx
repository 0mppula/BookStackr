import { FC, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { setQuery, setStatusFilters } from '../../features/books/slice';
import AddBookModal from '../Modals/AddBookModal';
import { FaPlus } from 'react-icons/fa';
import { selectStatusFilters } from '../../features/books/selectors';
import { RootState } from '../../app/store';
import { bookStatusType } from '../../assets/data/books';
import CustomCheckbox from './CustomCheckbox';

const BooksTableTools: FC = () => {
	const [addModalOpen, setAddModalOpen] = useState<boolean>(false);
	const [internalQuery, setInternalQuery] = useState('');

	const statusFilters = useSelector((state: RootState) => selectStatusFilters(state));

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

	return (
		<>
			<AddBookModal modalOpen={addModalOpen} setModalOpen={setAddModalOpen} />

			<div className="table-tools">
				<div>
					<button className="btn-icon" onClick={() => setAddModalOpen(true)}>
						<FaPlus /> Add Book
					</button>
					<button className="btn-icon" onClick={() => setAddModalOpen(true)}>
						<FaPlus />
					</button>
				</div>

				<div className="filters">
					<CustomCheckbox
						label="Reading"
						name="reading"
						onChange={(e) => handleStatusFilter(e)}
						checked={statusFilters.some((filter) => filter === 'reading')}
					/>

					<CustomCheckbox
						label="Read"
						name="read"
						onChange={(e) => handleStatusFilter(e)}
						checked={statusFilters.some((filter) => filter === 'read')}
					/>

					<CustomCheckbox
						label="Want to read"
						name="want to read"
						onChange={(e) => handleStatusFilter(e)}
						checked={statusFilters.some((filter) => filter === 'want to read')}
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
