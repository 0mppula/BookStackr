import { FC, useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import { Column, useTable, useSortBy } from 'react-table';
import { FaPen } from 'react-icons/fa';

import { RootState } from '../../app/store';
import { selectQueryFilteredBooks, booksSelector } from '../../features/BooksSlice';
import EditBookModal from '../Modals/EditBookModal';

interface ColumnType {
	id: string;
	index: string;
	author: string;
	title: string;
	category: number;
	readingMedium: string;
	yearRead: string;
	status: string;
}

const BooksTable: FC = () => {
	const [editModalOpen, setEditModalOpen] = useState<boolean>(false);
	const [editBookId, setEditBookId] = useState<null | string>(null);

	const unFilteredBooks = useSelector((state: RootState) => booksSelector(state));
	const books = useSelector((state: RootState) => selectQueryFilteredBooks(state));

	const data: any = useMemo(() => books, [unFilteredBooks]);
	const columns: Column<ColumnType>[] = useMemo(
		() => [
			{ Header: '#', accessor: 'index' },
			{ Header: 'Author', accessor: 'author' },
			{ Header: 'Title', accessor: 'title' },
			{
				Header: 'Category',
				accessor: 'category',
				Cell: ({ cell: { value: values } }: { cell: any }) => <>{values.join(', ')}</>,
			},
			{ Header: 'Medium', accessor: 'readingMedium' },
			{ Header: 'Year Read', accessor: 'yearRead' },
			{ Header: 'Status', accessor: 'status' },
			{
				Header: 'Edit',
				accessor: 'id',
				className: 'user',
				Cell: ({ cell: { value } }) => (
					<>
						<button onClick={() => handleEdit(value)}>
							<FaPen />
						</button>
					</>
				),
			},
		],
		[unFilteredBooks]
	);

	const handleEdit = (id: string) => {
		setEditModalOpen(true);
		setEditBookId(id);
	};

	const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = useTable(
		{
			columns,
			data,
		},
		useSortBy
	);

	return (
		<>
			<EditBookModal
				modalOpen={editModalOpen}
				setModalOpen={setEditModalOpen}
				editBookId={editBookId}
				setEditBookId={setEditBookId}
			/>

			<div className="table-container">
				<table {...getTableProps()}>
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
						{rows.map((row, i) => {
							const nextRowYearRead = rows?.[i + 1]?.cells[5]?.value;
							const currentRowYearRead = rows?.[i]?.cells[5]?.value;
							const addBorderBottomToRow =
								nextRowYearRead && currentRowYearRead !== nextRowYearRead;

							prepareRow(row);
							return (
								<tr
									{...row.getRowProps({
										className: addBorderBottomToRow ? 'border-bottom' : '',
									})}
								>
									{row.cells.map((cell: any) => (
										<td
											{...cell.getCellProps({
												className:
													cell?.column?.id === 'status'
														? `${cell?.value?.replaceAll(' ', '-')} ${
																cell?.column?.id
														  }`
														: cell?.column?.id,
											})}
											key={cell?.column?.id}
										>
											{cell.render('Cell')}
										</td>
									))}
								</tr>
							);
						})}
					</tbody>
				</table>
			</div>
		</>
	);
};

export default BooksTable;
