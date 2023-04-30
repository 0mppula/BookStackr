import { FC, useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import { Column, useTable, useSortBy, usePagination } from 'react-table';
import { FaPen } from 'react-icons/fa';

import {
	HiOutlineChevronDoubleRight,
	HiOutlineChevronDoubleLeft,
	HiOutlineChevronRight,
	HiOutlineChevronLeft,
} from 'react-icons/hi2';

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

	const {
		getTableProps,
		getTableBodyProps,
		headerGroups,
		// @ts-ignore
		page,
		// @ts-ignore
		nextPage,
		// @ts-ignore
		previousPage,
		// @ts-ignore
		canNextPage,
		// @ts-ignore
		canPreviousPage,
		// @ts-ignore
		pageOptions,
		// @ts-ignore
		gotoPage,
		// @ts-ignore
		pageCount,
		state,
		prepareRow,
	} = useTable(
		{
			columns,
			data,
			// @ts-ignore
			autoResetSortBy: false,
			// @ts-ignore
			initialState: { pageSize: 25 },
		},
		useSortBy,
		usePagination
	);

	// @ts-ignore
	const { pageIndex, pageSize } = state;

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
						{page.map((row: any) => {
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

			<div className="paginator">
				<button
					className="btn btn-icon"
					onClick={() => gotoPage(0)}
					disabled={!canPreviousPage}
				>
					<HiOutlineChevronDoubleLeft />
				</button>

				<button
					className="btn btn-icon"
					onClick={() => previousPage()}
					disabled={!canPreviousPage}
				>
					<HiOutlineChevronLeft />
				</button>

				<div>
					<span>
						Page {pageIndex + 1} / {pageOptions.length | 1} &nbsp;|&nbsp; Go to page:
					</span>
					<input
						type="number"
						min={1}
						max={+pageOptions.length}
						defaultValue={pageIndex + 1}
						onChange={(e) => {
							const pageN = e.target.value ? Number(e.target.value) - 1 : 0;
							gotoPage(pageN);
						}}
					/>
				</div>

				<button className="btn btn-icon" onClick={() => nextPage()} disabled={!canNextPage}>
					<HiOutlineChevronRight />
				</button>

				<button
					className="btn btn-icon"
					onClick={() => gotoPage(pageCount - 1)}
					disabled={!canNextPage}
				>
					<HiOutlineChevronDoubleRight />
				</button>
			</div>
		</>
	);
};

export default BooksTable;
