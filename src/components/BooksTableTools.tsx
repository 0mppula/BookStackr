import { FC } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../app/store';
import { setQuery } from '../features/BooksSlice';

const BooksTableTools: FC = () => {
	const { query } = useSelector((state: RootState) => state.books);

	const dispatch = useDispatch();

	return (
		<div className="table-tools">
			<div>
				<button>+ Add Book</button>
			</div>
			<div>
				<input
					type="search"
					placeholder="Search by title or author..."
					value={query}
					onChange={(e) => dispatch(setQuery(e.target.value))}
				/>
			</div>
		</div>
	);
};

export default BooksTableTools;
