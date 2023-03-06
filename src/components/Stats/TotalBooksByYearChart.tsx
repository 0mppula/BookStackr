import { FC } from 'react';

import { chartDataType } from '../../features/books/BooksSelectors';

interface TotalBooksByYearChartType {
	chartData: chartDataType;
}

const TotalBooksByYearChart: FC<TotalBooksByYearChartType> = ({ chartData }) => {
	// I need a stacked bar chart.
	// I need the unique years in an array
	// I need an array of the count of each book medium by year.
	return <div className="chart-container">Lorem ipsum dolor sit amet.</div>;
};

export default TotalBooksByYearChart;
