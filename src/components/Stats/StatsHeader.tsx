import { FC } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../app/store';
import { selectBooksCount, selectBooksCountByMedium } from '../../features/BooksSlice';

const StatsHeader: FC = () => {
	const booksCount = useSelector((state: RootState) => selectBooksCount(state));
	const { audioBookCount, eBookCount, paperBookCount } = useSelector((state: RootState) =>
		selectBooksCountByMedium(state)
	);

	return (
		<div className="stats-header-container">
			<h2>
				Books <span>{booksCount}</span>
			</h2>

			<h2>
				E-books <span>{`${((eBookCount / booksCount) * 100).toFixed(1)}%`}</span>
			</h2>

			<h2>
				Audio <span>{`${((audioBookCount / booksCount) * 100).toFixed(1)}%`}</span>
			</h2>

			<h2>
				Paper <span>{`${((paperBookCount / booksCount) * 100).toFixed(1)}%`}</span>
			</h2>
		</div>
	);
};

export default StatsHeader;
