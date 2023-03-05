import { FC } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../app/store';
import { selectReadBooksCount, selectReadBooksCountByMedium } from '../../features/BooksSlice';

const StatsHeader: FC = () => {
	const booksReadCount = useSelector((state: RootState) => selectReadBooksCount(state));
	const { audioBooksRead, eBooksRead, paperBooksRead } = useSelector((state: RootState) =>
		selectReadBooksCountByMedium(state)
	);

	return (
		<div className="stats-header-container">
			<h2>
				Books Read<span>{booksReadCount}</span>
			</h2>

			<h2>
				Audio <span>{`${((audioBooksRead / booksReadCount) * 100).toFixed(2)}%`}</span>
			</h2>

			<h2>
				E-Books <span>{`${((eBooksRead / booksReadCount) * 100).toFixed(2)}%`}</span>
			</h2>

			<h2>
				Paper <span>{`${((paperBooksRead / booksReadCount) * 100).toFixed(2)}%`}</span>
			</h2>
		</div>
	);
};

export default StatsHeader;
