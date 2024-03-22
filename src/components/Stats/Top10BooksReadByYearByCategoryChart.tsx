import {
	BarElement,
	CategoryScale,
	Chart as ChartJS,
	Legend,
	LinearScale,
	Title,
	Tooltip,
} from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { useMemo } from 'react';
import { Bar } from 'react-chartjs-2';
import { useSelector } from 'react-redux';
import { RootState } from '../../app/store';
import { selectReadBooksByYearByCategory } from '../../features/books/selectors';
import { cssVar } from '../../helpers/getCssVariable';
import { useWindowWidth } from '../../hooks/useWindowWidth';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ChartDataLabels);

const Top10BooksReadByYearByCategoryChart = () => {
	const windowWidth = useWindowWidth();
	const { years, datasets } = useSelector((state: RootState) =>
		selectReadBooksByYearByCategory(state)
	);

	const top10Datasets = useMemo(() => {
		const categoryCountByYear: {
			[year: string]: {
				[category: string]: number;
			};
		} = {};

		years.forEach((year, index) => {
			categoryCountByYear[year] = {};

			datasets.forEach((dataset) => {
				categoryCountByYear[year][dataset.label] = dataset.data[index];
			});

			const categories = categoryCountByYear[year];
			const sortedCategories = Object.entries(categories)
				.sort((a, b) => b[1] - a[1])
				.slice(0, 10);

			categoryCountByYear[year] = Object.fromEntries(sortedCategories);
		});

		const top10 = datasets
			.map((dataset) => {
				const data = years.map((year) => categoryCountByYear[year][dataset.label] || 0);

				return { ...dataset, data };
			})
			.filter((dataset) => dataset.data.some((value) => value !== 0));

		return top10;
	}, [datasets]);

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
		indexAxis: windowWidth >= 992 ? ('y' as const) : ('x' as const),
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
				text: 'Top 10 Read Categories by Year',
				color: cssVar('--light'),
				font: {
					weight: '400',
					size: 18,
				},
			},
			legend: {
				onClick: function (e: any, legendItem: any, legend: any) {
					const index = legendItem.datasetIndex;
					const ci = legend.chart;

					if (ci.isDatasetVisible(index)) {
						ci.hide(index);
						legendItem.hidden = true;
					} else {
						ci.show(index);
						legendItem.hidden = false;
					}

					if (index === 0) {
						ci.data.datasets.forEach((e: any, i: number) => {
							if (i === 0) return;

							if (legendItem.hidden) {
								ci.hide(i);
								e.hidden = true;
							} else {
								ci.show(i);
								e.hidden = false;
							}
						});
					}
				},
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
				ticks: {
					color: cssVar('--light'),
					beginAtZero: true,
					display: windowWidth < 992,
					stepSize: 8,
				},
				grid: {
					color: 'transparent',
				},
			},
			y: {
				stacked: true,
				ticks: {
					color: cssVar('--light'),
					beginAtZero: true,
					count: 11,
					display: windowWidth >= 992,
				},
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
			{ label: 'All categories', data: [], backgroundColor: `${cssVar('--light')}` },
			...top10Datasets,
		],
	};

	const plugins = [legendMargin];

	return (
		<div className="chart-container read-books-by-year-by-category">
			<Bar options={options} data={data as any} plugins={plugins} />
		</div>
	);
};

export default Top10BooksReadByYearByCategoryChart;
