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

const BooksReadByCategory: FC = () => {
	const { allBookGroupedCategories, uniqueBookCategories } = useSelector((state: RootState) =>
		selectBookCategoryStatsData(state)
	);

	console.log(allBookGroupedCategories)

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
			title: {
				display: true,
				text: 'Books Read by Category by Year',
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
				ticks: { color: cssVar('--light'), beginAtZero: true, count: 11 },
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

	const plugins = [legendMargin];

	return (
		<div className="chart-container">
			<Bar options={options} data={data as any} plugins={plugins} />
		</div>
	);
};

export default BooksReadByCategory;
