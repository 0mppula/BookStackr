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
import ChartjsPluginStacked100 from 'chartjs-plugin-stacked100';

import { chartDataType } from '../../features/books/BooksSelectors';
import { cssVar } from '../../helpers/getCssVariable';

ChartJS.register(
	CategoryScale,
	LinearScale,
	BarElement,
	Title,
	Tooltip,
	Legend,
	ChartDataLabels,
	ChartjsPluginStacked100
);

interface BooksReadByYearChart100Type {
	chartData: chartDataType;
}

const BooksReadByYearChart100: FC<BooksReadByYearChart100Type> = ({ chartData }) => {
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
				callbacks: {
					label: function (context: any) {
						let label = context.dataset.label || '';
						let rawValue = context.raw;
						let formattedValue = context.formattedValue;
						let formattedLabel = `${label}: ${formattedValue}% (${rawValue})`;

						return formattedLabel;
					},
				},
			},
			stacked100: { enable: true, replaceTooltipLabel: true, precision: 2 },
			datalabels: {
				backgroundColor: cssVar('--dark-alt'),
				borderRadius: 3,
				color: cssVar('--light'),
				font: {
					family: cssVar('--font-main'),
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
				formatter: (_value: any, context: any) => {
					const data = context.chart.data;
					const { datasetIndex, dataIndex } = context;
					return `${data.calculatedData[datasetIndex][dataIndex]}%`;
				},
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
				ticks: { color: cssVar('--light'), beginAtZero: true, stepSize: 10 },
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

export default BooksReadByYearChart100;
