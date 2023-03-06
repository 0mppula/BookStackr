import { FC, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

import { setQuery } from '../../features/books/BooksSlice';
import AddBookModal from '../Modals/AddBookModal';
import './styles.css';

const BooksTableTools: FC = () => {
	const [addModalOpen, setAddModalOpen] = useState<boolean>(false);
	const [internalQuery, setInternalQuery] = useState('');

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

	return (
		<>
			<AddBookModal modalOpen={addModalOpen} setModalOpen={setAddModalOpen} />

			<div className="table-tools">
				<div>
					<button onClick={() => setAddModalOpen(true)}>+ Add Book</button>
				</div>
				<div>
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
