import { FC, useMemo } from 'react';
import { useSelector } from 'react-redux';
import { Column } from 'react-table';
import { RootState } from '../../app/store';
import { selectBooksStatsTableData } from '../../features/BooksSlice';

const StatsTable: FC = () => {
	interface ColumnType {
		uniqueYears: number;
		totalBooksReadByYear: number;
		audioBooksReadByYear: number;
		eBooksReadByYear: number;
		paperBooksReadByYear: number;
		eBooksPercentByYear: string;
		audioPercentByYear: string;
		paperPercentByYear: string;
		booksPerWeekByYear: number;
	}

	const tableData = useSelector((state: RootState) => selectBooksStatsTableData(state));

	const data: any = useMemo(() => tableData, [tableData]);
	const columns: Column<ColumnType>[] = useMemo(
		() => [
			{ Header: 'Year', accessor: 'uniqueYears' },
			{ Header: 'Books', accessor: 'totalBooksReadByYear' },
			{ Header: 'Audio', accessor: 'audioBooksReadByYear' },
			{ Header: 'E-books', accessor: 'eBooksReadByYear' },
			{ Header: 'Paper', accessor: 'paperBooksReadByYear' },
			{ Header: 'E-books %', accessor: 'eBooksPercentByYear' },
			{ Header: 'Audio %', accessor: 'audioPercentByYear' },
			{ Header: 'Paper %', accessor: 'paperPercentByYear' },
			{ Header: 'Books / Week', accessor: 'booksPerWeekByYear' },
		],
		[tableData]
	);

	return <div className="table-container">StatsTable</div>;
};

export default StatsTable;
