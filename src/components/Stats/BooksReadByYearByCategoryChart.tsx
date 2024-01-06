import { useSelector } from 'react-redux';
import { RootState } from '../../app/store';
import { selectReadBooksByYearByCategory } from '../../features/books/selectors';
import { Chart as ChartJS } from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { cssVar } from '../../helpers/getCssVariable';

const BooksReadByYearByCategoryChart = () => {
	const { years, datasets } = useSelector((state: RootState) =>
		selectReadBooksByYearByCategory(state)
	);

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
				text: 'Books Categories by Year',
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
		datasets: datasets,
	};

	const plugins = [legendMargin];

	return (
		<div className="chart-container read-books-by-year-by-category">
			<Bar options={options} data={data as any} plugins={plugins} />
		</div>
	);
};

export default BooksReadByYearByCategoryChart;
