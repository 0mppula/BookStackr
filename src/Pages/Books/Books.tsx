import { FC } from 'react';

import BooksTable from '../../components/Books/BooksTable';
import BooksTableTools from '../../components/Books/BooksTableTools';
import { useTitle } from '../../hooks/useTitle';
import './styles.css';

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
