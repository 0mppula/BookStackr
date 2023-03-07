import { FC } from 'react';
import {
	Chart as ChartJS,
	CategoryScale,
	LinearScale,
	BarElement,
	Title,
	Tooltip,
	Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

import { chartDataType } from '../../features/books/BooksSelectors';
import { cssVar } from '../../helpers/getCssVariable';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

interface TotalBooksByYearChartType {
	chartData: chartDataType;
}

const TotalBooksByYearChart: FC<TotalBooksByYearChartType> = ({ chartData }) => {
	const { years, audioBooksReadByYear, eBooksReadByYear, paperBooksReadByYear } = chartData;

	const legendMargin = {
		id: 'legendMargin',
		beforeInit(chart: any) {
			const fitValue = chart.legend.fit;
			chart.legend.fit = function fit() {
				fitValue.bind(chart.legend)();
				return (this.height += 8);
			};
		},
	};

	const options = {
		responsive: true,
		maintainAspectRatio: false,
		plugins: {
			tooltip: {
				enabled: false,
			},
			title: {
				display: true,
				text: 'Books Read by Year',
				color: cssVar('--light'),
				font: {
					weight: '400',
					size: 18,
					family: cssVar('--font-main'),
				},
			},
			legend: {
				labels: {
					color: cssVar('--light'),
					font: {
						weight: '200',
						family: cssVar('--font-main'),
					},
				},
			},
		},
		scales: {
			x: {
				stacked: true,
				ticks: { color: cssVar('--light'), beginAtZero: true },
				grid: {
					color: 'transparent',
				},
			},
			y: {
				stacked: true,
				ticks: { color: cssVar('--light'), beginAtZero: true, stepSize: 5 },
				border: {
					display: false,
				},
				grid: {
					color: cssVar('--dark-alt'),
					tickLength: 8,
					tickColor: 'transparent',
				},
			},
		},
	};

	const labels = years;

	const data = {
		labels,
		datasets: [
			{
				label: 'Audio',
				data: audioBooksReadByYear?.map((count) => count),
				backgroundColor: `${cssVar('--light')}`,
			},
			{
				label: 'E-Book',
				data: eBooksReadByYear?.map((count) => count),
				backgroundColor: `${cssVar('--secondary')}`,
			},
			{
				label: 'Paper',
				data: paperBooksReadByYear?.map((count) => count),
				backgroundColor: `${cssVar('--primary')}`,
			},
		],
	};

	const plugins = [legendMargin];

	return (
		<div className="chart-container">
			<Bar options={options} data={data as any} plugins={plugins} />
		</div>
	);
};

export default TotalBooksByYearChart;
