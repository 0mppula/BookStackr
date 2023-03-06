import { FC } from 'react';
import TotalBooksByYearChart from './TotalBooksByYearChart';

const StatsCharts: FC = () => {
	return (
		<div className="stats-charts-container">
			<TotalBooksByYearChart />

			<div className="chart-container">Lorem ipsum dolor sit amet.</div>

			<div className="chart-container">Lorem ipsum dolor sit amet.</div>
		</div>
	);
};

export default StatsCharts;
