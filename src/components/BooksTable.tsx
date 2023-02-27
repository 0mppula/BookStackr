import { FC, useMemo } from 'react';
import { useSelector } from 'react-redux';
import { Column, useTable } from 'react-table';
import { RootState } from '../app/store';
import { selectQueryFilteredBooks } from '../features/BooksSlice';

interface ColumnType {
	index: string;
	author: string;
	title: string;
	category: number;
	readingMedium: string;
	yearRead: string;
	status: string;
}

const BooksTable: FC = () => {
	const books = useSelector((state: RootState) => selectQueryFilteredBooks(state));

	const data: any = useMemo(() => books, [books]);
	const columns: Column<ColumnType>[] = useMemo(
		() => [
			{ Header: '#', accessor: 'index' },
			{ Header: 'Author', accessor: 'author' },
			{ Header: 'Title', accessor: 'title' },
			{ Header: 'Category', accessor: 'category' },
			{ Header: 'Medium', accessor: 'readingMedium' },
			{ Header: 'Year Read', accessor: 'yearRead' },
			{ Header: 'Status', accessor: 'status' },
		],
		[]
	);

	const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = useTable({
		columns,
		data,
	});

	return (
		<div className="table-container">
			<table {...getTableProps()}>
				<thead>
					{headerGroups.map((headerGroup) => (
						<tr {...headerGroup.getHeaderGroupProps()}>
							{headerGroup.headers.map((column) => (
								<th {...column.getHeaderProps()}>{column.render('Header')}</th>
							))}
						</tr>
					))}
				</thead>

				<tbody {...getTableBodyProps()}>
					{rows.map((row, i) => {
						const nextRowYearRead = rows?.[i + 1]?.cells[5]?.value;
						const currentRowYearRead = rows?.[i]?.cells[5]?.value;
						const addBorderBottomToRow =
							nextRowYearRead && currentRowYearRead !== nextRowYearRead;
						const currentRowReadStatus = rows?.[i]?.cells[6]?.value;

						prepareRow(row);
						return (
							<tr
								className={addBorderBottomToRow ? 'border-bottom' : ''}
								{...row.getRowProps()}
							>
								{row.cells.map((cell) => (
									<td
										key={cell?.column?.id}
										className={
											cell?.column?.id === 'status'
												? `${currentRowReadStatus?.replaceAll(' ', '-')} ${
														cell?.column?.id
												  }`
												: cell?.column?.id
										}
									>
										{/* The category cell value is an array and needs to be printed as comma 
                    seperated values in the table. */}
										{Array.isArray(cell?.value)
											? (cell.value = cell?.value?.join(', '))
											: cell.render('Cell')}
									</td>
								))}
							</tr>
						);
					})}
				</tbody>
			</table>
		</div>
	);
};

export default BooksTable;
