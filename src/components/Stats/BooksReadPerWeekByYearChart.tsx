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

interface BooksReadPerWeekByYearChartType {
	chartData: chartDataType;
}

const BooksReadPerWeekByYearChart: FC<BooksReadPerWeekByYearChartType> = ({ chartData }) => {
	const { years, booksPerWeekByYear } = chartData;

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
				callbacks: {
					label: function (context: any) {
						let label: string = context.dataset.label || '';

						if (label) {
							label += ': ';
						}

						if (context.parsed.y !== null && typeof context.parsed.y === 'number') {
							label += context.parsed.y.toFixed(2);
						}
						return label;
					},
				},
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
				text: 'Books Read per Week by Year',
				color: cssVar('--light'),
				font: {
					weight: '400',
					size: 18,
				},
			},
			legend: {
				display: false,
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
				label: 'Books / Week',
				data: booksPerWeekByYear?.map((count) => count),
				backgroundColor: `${cssVar('--light')}`,
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

export default BooksReadPerWeekByYearChart;
