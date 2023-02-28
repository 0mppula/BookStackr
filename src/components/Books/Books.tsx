import { FC, useState } from 'react';

import BooksTable from '../BooksTable/BooksTable';
import BooksTableTools from '../BooksTableTools/BooksTableTools';
import AddBookModal from '../Modals/AddBookModal';

const Books: FC = () => {
	const [addModalOpen, setAddModalOpen] = useState<boolean>(false);
	return (
		<>
			<AddBookModal modalOpen={addModalOpen} setModalOpen={setAddModalOpen} />

			<BooksTableTools setAddModalOpen={setAddModalOpen} />

			<BooksTable />
		</>
	);
};

export default Books;
