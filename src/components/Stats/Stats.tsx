import { FC } from 'react';

import { useTitle } from '../../hooks/useTitle';
import StatsHeader from './StatsHeader';
import './styles.css';

const Stats: FC = () => {
	useTitle('Stats');
	return (
		<>
			<StatsHeader />
		</>
	);
};

export default Stats;
