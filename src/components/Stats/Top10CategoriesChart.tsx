import { Chart as ChartJS } from 'chart.js';
import { useMemo } from 'react';
import { Bar } from 'react-chartjs-2';
import { useSelector } from 'react-redux';
import { RootState } from '../../app/store';
import {
	selectReadBooksCategoriesChartData,
	selectReadBooksCount,
} from '../../features/books/selectors';
import { cssVar } from '../../helpers/getCssVariable';

interface Top10CategoriesChartProps {}

const Top10CategoriesChart = ({}: Top10CategoriesChartProps) => {
	const booksReadCount = useSelector((state: RootState) => selectReadBooksCount(state));
	const { categories, categoryCounts } = useSelector((state: RootState) =>
		selectReadBooksCategoriesChartData(state)
	);

	const top10Categories = useMemo(() => categories.slice(0, 10), [categories]);
	const top10CategoryCounts = useMemo(() => categoryCounts.slice(0, 10), [categoryCounts]);

	ChartJS.defaults.font.family = cssVar('--font-main');

	const options = {
		responsive: true,
		indexAxis: 'y' as const,
		maintainAspectRatio: false,
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
				text: 'Top 10 Read Categories',
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

	const labels = top10Categories;

	const data = {
		labels,
		datasets: [
			{
				label: 'Category',
				data: top10CategoryCounts.map((count) => count),
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

export default Top10CategoriesChart;
