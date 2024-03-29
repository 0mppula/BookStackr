import { FC } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../app/store';
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

import {
	selectReadBooksCategoriesChartData,
	selectReadBooksCount,
} from '../../features/books/selectors';
import { cssVar } from '../../helpers/getCssVariable';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const ReadBookCategoriesChart: FC = () => {
	const booksReadCount = useSelector((state: RootState) => selectReadBooksCount(state));
	const { categories, categoryCounts } = useSelector((state: RootState) =>
		selectReadBooksCategoriesChartData(state)
	);

	ChartJS.defaults.font.family = cssVar('--font-main');

	const options = {
		responsive: true,
		maintainAspectRatio: false,
		indexAxis: 'y' as const,
		plugins: {
			tooltip: {
				titleFont: {
					weight: '400',
				},
				bodyFont: {
					weight: '200',
				},
				callbacks: {
					label: function (context: any) {
						let formattedValue = context.formattedValue;

						let formattedLabel = `Count: ${formattedValue} (${(
							(formattedValue / booksReadCount) *
							100
						).toFixed(2)}%)`;

						return formattedLabel;
					},
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
			},
			title: {
				display: true,
				text: 'Read Categories',
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
				ticks: { color: cssVar('--light'), beginAtZero: true },
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

	const labels = categories;

	const data = {
		labels,
		datasets: [
			{
				label: 'Category',
				data: categoryCounts.map((count) => count),
				backgroundColor: `${cssVar('--light')}`,
			},
		],
	};

	return (
		<div className="chart-container categories">
			<Bar options={options} data={data as any} />
		</div>
	);
};

export default ReadBookCategoriesChart;
