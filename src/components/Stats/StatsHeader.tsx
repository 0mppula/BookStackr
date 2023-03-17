import { FC } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../app/store';

import { selectReadBooksDataByMedium } from '../../features/books/selectors';

const StatsHeader: FC = () => {
	const {
		totalBooks,
		audioBooks,
		eBooks,
		paperBooks,
		audioBooksPercent,
		eBooksPercent,
		paperBooksPercent,
	} = useSelector((state: RootState) => selectReadBooksDataByMedium(state));

	return (
		<div className="stats-header-container">
			<h2>
				Books Read<span>{totalBooks}</span> <span>100%</span>
			</h2>

			<h2>
				Audio Books <span>{audioBooks}</span>
				<span>{audioBooksPercent}</span>
			</h2>

			<h2>
				E-Books <span>{eBooks}</span>
				<span>{eBooksPercent}</span>
			</h2>

			<h2>
				Paper Books <span>{paperBooks}</span>
				<span>{paperBooksPercent}</span>
			</h2>
		</div>
	);
};

export default StatsHeader;
