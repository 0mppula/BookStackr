import { FC } from 'react';
import { chartDataType } from '../../features/books/BooksSelectors';
import TotalBooksByYearChart from './TotalBooksByYearChart';

interface StatsChartsType {
	chartData: chartDataType;
}

const StatsCharts: FC<StatsChartsType> = ({ chartData }) => {
	return (
		<div className="stats-charts-container">
			<TotalBooksByYearChart chartData={chartData} />

			<div className="chart-container">Lorem ipsum dolor sit amet.</div>

			<div className="chart-container">Lorem ipsum dolor sit amet.</div>
		</div>
	);
};

export default StatsCharts;
