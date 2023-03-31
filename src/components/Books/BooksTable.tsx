import { FC, useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import { Column, useTable, useSortBy } from 'react-table';
import { FaPen } from 'react-icons/fa';

import { RootState } from '../../app/store';
import { selectQueryFilteredBooks } from '../../features/books/selectors';
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

	const books = useSelector((state: RootState) => selectQueryFilteredBooks(state));

	const data: any = useMemo(() => books, [books]);
	const columns: Column<ColumnType>[] = useMemo(
		() => [
			{
				Header: '#',
				accessor: 'index',
				Cell: ({ cell }: { cell: any }) => <>{cell.row.index + 1}</>,
			},
			{ Header: 'Author', accessor: 'author' },
			{ Header: 'Title', accessor: 'title' },
			{
				Header: 'Category',
				accessor: 'category',
				Cell: ({ cell: { value: values } }: { cell: any }) => <>{values.join(', ')}</>,
			},
			{ Header: 'Medium', accessor: 'readingMedium' },
			{ Header: 'Year', accessor: 'yearRead' },
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
				disableSortBy: true,
			},
		],
		[books]
	);

	const handleEdit = (id: string) => {
		setEditModalOpen(true);
		setEditBookId(id);
	};

	const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = useTable(
		{
			columns,
			data,
			// @ts-ignore
			autoResetSortBy: false,
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

										{column.isSorted && (column.isSortedDesc ? ' 🔽' : ' 🔼')}
									</th>
								))}
							</tr>
						))}
					</thead>

					<tbody {...getTableBodyProps()}>
						{rows.map((row) => {
							prepareRow(row);
							return (
								<tr {...row.getRowProps()}>
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
