import { FC } from 'react';
import { chartDataType } from '../../features/books/selectors';
import BooksReadByYearByCategoryChart from './BooksReadByYearByCategoryChart';
import BooksReadByYearChart from './BooksReadByYearChart';
import BooksReadByYearChart100 from './BooksReadByYearChart100';
import BooksReadPerWeekByYearChart from './BooksReadPerWeekByYearChart';
import ReadBookCategoriesChart from './ReadBookCategoriesChart';
import Top10CategoriesChart from './Top10CategoriesChart';

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
