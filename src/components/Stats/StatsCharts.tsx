import { FC } from 'react';
import { chartDataType } from '../../features/books/BooksSelectors';
import BooksReadByCategory from './BooksReadByCategory';
import BooksReadByYearChart from './BooksReadByYearChart';
import BooksReadByYearChart100 from './BooksReadByYearChart100';
import BooksReadPerWeekByYearChart from './BooksReadPerWeekByYearChart';

interface StatsChartsType {
	chartData: chartDataType;
}

const StatsCharts: FC<StatsChartsType> = ({ chartData }) => {
	return (
		<div className="stats-charts-container">
			<BooksReadByYearChart chartData={chartData} />

			<BooksReadByYearChart100 chartData={chartData} />

			<BooksReadPerWeekByYearChart chartData={chartData} />

			<BooksReadByCategory />
		</div>
	);
};

export default StatsCharts;
