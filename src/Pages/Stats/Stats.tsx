import { FC } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../app/store';
import { selectBooksStatsData } from '../../features/books/BooksSelectors';

import { useTitle } from '../../hooks/useTitle';
import StatsCharts from '../../components/Stats/StatsCharts';
import StatsHeader from '../../components/Stats/StatsHeader';
import StatsTable from '../../components/Stats/StatsTable';
import './styles.css';

const Stats: FC = () => {
	useTitle('Stats');

	const { tableData, chartData } = useSelector((state: RootState) => selectBooksStatsData(state));

	return (
		<>
			<StatsTable tableData={tableData} />
			
			<StatsHeader />

			<StatsCharts chartData={chartData} />
		</>
	);
};

export default Stats;
