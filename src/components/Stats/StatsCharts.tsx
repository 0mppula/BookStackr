import { FC } from 'react';
import { chartDataType } from '../../features/books/BooksSelectors';
import BooksReadByYearChart from './BooksReadByYearChart';
import BooksReadByYearChart100 from './BooksReadByYearChart100';

interface StatsChartsType {
	chartData: chartDataType;
}

const StatsCharts: FC<StatsChartsType> = ({ chartData }) => {
	return (
		<div className="stats-charts-container">
			<BooksReadByYearChart chartData={chartData} />

			<BooksReadByYearChart100 chartData={chartData} />

			<div className="chart-container">Chart 3</div>
		</div>
	);
};

export default StatsCharts;
