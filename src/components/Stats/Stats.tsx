import { FC } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../app/store';
import { selectBooksStatsData } from '../../features/books/BooksSelectors';

import { useTitle } from '../../hooks/useTitle';
import StatsCharts from './StatsCharts';
import StatsHeader from './StatsHeader';
import StatsTable from './StatsTable';
import './styles.css';

const Stats: FC = () => {
	useTitle('Stats');

	const { tableData, chartData } = useSelector((state: RootState) => selectBooksStatsData(state));

	return (
		<>
			<StatsHeader />

			<StatsTable tableData={tableData} />

			<StatsCharts chartData={chartData} />
		</>
	);
};

export default Stats;
