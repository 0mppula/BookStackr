import { FC } from 'react';

import { useTitle } from '../../hooks/useTitle';
import StatsHeader from './StatsHeader';
import StatsTable from './StatsTable';
import './styles.css';

const Stats: FC = () => {
	useTitle('Stats');
	return (
		<>
			<StatsHeader />

			<StatsTable />
		</>
	);
};

export default Stats;
