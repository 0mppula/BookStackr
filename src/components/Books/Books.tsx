import { FC } from 'react';

import BooksTable from './BooksTable';
import BooksTableTools from './BooksTableTools';
import { useTitle } from '../../hooks/useTitle';

const Books: FC = () => {
	useTitle('Books');

	return (
		<>
			<BooksTableTools />

			<BooksTable />
		</>
	);
};

export default Books;
