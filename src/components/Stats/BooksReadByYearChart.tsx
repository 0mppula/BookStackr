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
import ChartDataLabels from 'chartjs-plugin-datalabels';

import { chartDataType } from '../../features/books/selectors';
import { cssVar } from '../../helpers/getCssVariable';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ChartDataLabels);

interface BooksReadByYearChartType {
	chartData: chartDataType;
}

const BooksReadByYearChart: FC<BooksReadByYearChartType> = ({ chartData }) => {
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

	ChartJS.defaults.font.family = cssVar('--font-main');

	const options = {
		responsive: true,
		maintainAspectRatio: false,
		plugins: {
			tooltip: {
				titleFont: {
					weight: '400',
				},
				bodyFont: {
					weight: '200',
				},
			},
			datalabels: {
				backgroundColor: cssVar('--dark-alt'),
				borderRadius: 3,
				color: cssVar('--light'),
				font: {
					weight: 200,
				},
				padding: {
					bottom: 2,
				},
				// Only show data label if value is above 0.
				display: function (context: any) {
					let index = context.dataIndex;
					let value = context.dataset.data[index];
					return value > 0;
				},
			},
			title: {
				display: true,
				text: 'Books Read by Year',
				color: cssVar('--light'),
				font: {
					weight: '400',
					size: 18,
				},
			},
			legend: {
				labels: {
					color: cssVar('--light'),
					font: {
						size: 14,
						weight: '200',
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
				ticks: { color: cssVar('--light'), beginAtZero: true, count: 11 },
				border: {
					display: false,
				},
				grid: {
					color: cssVar('--light-alt-light'),
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
				backgroundColor: `${cssVar('--secondary-light')}`,
			},
			{
				label: 'Paper',
				data: paperBooksReadByYear?.map((count) => count),
				backgroundColor: `${cssVar('--primary-light')}`,
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

export default BooksReadByYearChart;
