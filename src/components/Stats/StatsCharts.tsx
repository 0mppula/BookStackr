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

			<div className="chart-container">Chart 2</div>

			<div className="chart-container">Chart 3</div>
		</div>
	);
};

export default StatsCharts;
