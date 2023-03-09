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

import { selectBookCategoryStatsData } from '../../features/books/BooksSelectors';
import { cssVar } from '../../helpers/getCssVariable';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const ReadBookCategoryCountChart: FC = () => {
	const { allBookGroupedCategories, uniqueBookCategories } = useSelector((state: RootState) =>
		selectBookCategoryStatsData(state)
	);

	ChartJS.defaults.font.family = cssVar('--font-main');

	const options = {
		responsive: true,
		maintainAspectRatio: false,
		indexAxis: 'y' as const,
		plugins: {
			tooltip: {
				callbacks: {
					label: function (context: any) {
						let formattedValue = context.formattedValue;

						return 'Count: ' + formattedValue;
					},
				},
			},
			datalabels: {
				display: false,
			},
			title: {
				display: true,
				text: 'Read Book Category Count',
				color: cssVar('--light'),
				font: {
					weight: '400',
					size: 18,
					family: cssVar('--font-main'),
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
					color: cssVar('--dark-alt'),
					tickLength: 8,
					tickColor: 'transparent',
				},
			},
		},
	};

	const labels = uniqueBookCategories;

	const data = {
		labels,
		datasets: [
			{
				label: 'Category',
				data: allBookGroupedCategories.map((category) => category.length),
				backgroundColor: `${cssVar('--light')}`,
			},
		],
	};

	return (
		<div className="chart-container">
			<Bar options={options} data={data as any} />
		</div>
	);
};

export default ReadBookCategoryCountChart;
