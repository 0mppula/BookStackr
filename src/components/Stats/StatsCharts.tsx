import { FC } from 'react';
import { chartDataType } from '../../features/books/selectors';
import ReadBookCategoriesChart from './ReadBookCategoriesChart';
import BooksReadByYearChart from './BooksReadByYearChart';
import BooksReadByYearChart100 from './BooksReadByYearChart100';
import BooksReadPerWeekByYearChart from './BooksReadPerWeekByYearChart';
import Top10CategoriesChart from './Top10CategoriesChart';
import BooksReadByYearByCategoryChart from './BooksReadByYearByCategoryChart';

interface StatsChartsType {
	chartData: chartDataType;
}

const StatsCharts: FC<StatsChartsType> = ({ chartData }) => {
	return (
		<div className="stats-charts-container">
			<BooksReadByYearChart chartData={chartData} />

			<Top10CategoriesChart />

			<ReadBookCategoriesChart />

			<BooksReadByYearChart100 chartData={chartData} />

			<BooksReadPerWeekByYearChart chartData={chartData} />

			<BooksReadByYearByCategoryChart />
		</div>
	);
};

export default StatsCharts;
