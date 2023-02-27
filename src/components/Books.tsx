import { FC } from 'react';

import BooksTable from './BooksTable';
import BooksTableTools from './BooksTableTools';

import './styles.css';

const Books: FC = () => {
	return (
		<>
			<BooksTableTools />

			<BooksTable />
		</>
	);
};

export default Books;
