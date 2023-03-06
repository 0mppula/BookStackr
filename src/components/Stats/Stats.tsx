import { FC } from 'react';

import { useTitle } from '../../hooks/useTitle';
import StatsCharts from './StatsCharts';
import StatsHeader from './StatsHeader';
import StatsTable from './StatsTable';
import './styles.css';

const Stats: FC = () => {
	useTitle('Stats');
	return (
		<>
			<StatsHeader />

			<StatsTable />

			<StatsCharts />
		</>
	);
};

export default Stats;
