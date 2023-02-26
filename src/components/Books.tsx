import { FC } from 'react';

import BooksTable from './BooksTable';

import './styles.css';

const Books: FC = () => {
	return (
		<>
			<div className="table-tools">
				<div>
					<button>+ Add Book</button>
				</div>
				<div>
					<input type="search" placeholder="Search by title or author..." name="" id="" />
				</div>
			</div>

			<BooksTable />
		</>
	);
};

export default Books;
