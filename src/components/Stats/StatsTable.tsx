import { FC, useMemo } from 'react';
import { Column, useSortBy, useTable } from 'react-table';

import { selectBooksLoadingState, tableRowDataType } from '../../features/books/selectors';
import { useSelector } from 'react-redux';
import { RootState } from '../../app/store';

interface StatsTableType {
	tableData: tableRowDataType[];
}

const StatsTable: FC<StatsTableType> = ({ tableData }) => {
	interface ColumnType {
		years: number;
		totalBooksReadByYear: number;
		audioBooksReadByYear: number;
		eBooksReadByYear: number;
		paperBooksReadByYear: number;
		eBooksPercentByYear: string;
		audioPercentByYear: string;
		paperPercentByYear: string;
		booksPerWeekByYear: number;
	}

	const data: any = useMemo(() => tableData, [tableData]);

	const columns: Column<ColumnType>[] = useMemo(
		() => [
			{ Header: 'Year', accessor: 'years', className: 'center' },
			{ Header: 'Books', accessor: 'totalBooksReadByYear' },
			{ Header: 'Audio', accessor: 'audioBooksReadByYear' },
			{ Header: 'E-books', accessor: 'eBooksReadByYear' },
			{ Header: 'Paper', accessor: 'paperBooksReadByYear' },
			{ Header: 'Audio %', accessor: 'audioPercentByYear' },
			{ Header: 'E-books %', accessor: 'eBooksPercentByYear' },
			{ Header: 'Paper %', accessor: 'paperPercentByYear' },
			{ Header: 'Books / Week', accessor: 'booksPerWeekByYear' },
		],
		[tableData]
	);

	const booksLoading = useSelector((state: RootState) => selectBooksLoadingState(state));
	const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = useTable(
		{
			columns,
			data,
		},
		useSortBy
	);

	return (
		<div className="table-container">
			<table {...getTableProps()} className="books-stats-table">
				<thead>
					{headerGroups.map((headerGroup) => (
						<tr {...headerGroup.getHeaderGroupProps()}>
							{headerGroup.headers.map((column: any) => (
								<th
									{...column.getHeaderProps([
										{ className: column.id },
										column.getSortByToggleProps(),
									])}
								>
									{column.render('Header')}

									<span>
										{column.isSorted
											? column.isSortedDesc
												? ' 🔽'
												: ' 🔼'
											: ''}
									</span>
								</th>
							))}
						</tr>
					))}
				</thead>

				<tbody {...getTableBodyProps()}>
					{(rows.length > 0 &&
						rows.map((row) => {
							prepareRow(row);
							return (
								<tr {...row.getRowProps()}>
									{row.cells.map((cell: any) => (
										<td
											{...cell.getCellProps({ className: cell?.column?.id })}
											key={cell?.column?.id}
										>
											{cell.render('Cell')}
										</td>
									))}
								</tr>
							);
						})) || (
						<tr>
							<td className="empty-row" colSpan={9}>
								{booksLoading ? 'Loading books...' : 'No books found 📕'}
							</td>
						</tr>
					)}
				</tbody>
			</table>
		</div>
	);
};

export default StatsTable;
