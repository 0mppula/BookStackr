import { FC, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { RootState } from '../../app/store';

import BooksTable from '../../components/Books/BooksTable';
import BooksTableTools from '../../components/Books/BooksTableTools';
import { selectBooksMessageAndError } from '../../features/books/selectors';
import { resetMessageAndError } from '../../features/books/slice';
import { useTitle } from '../../hooks/useTitle';
import './styles.css';

const Books: FC = () => {
	useTitle('Books');

	const { message, error } = useSelector((state: RootState) => selectBooksMessageAndError(state));

	useEffect(() => {
		if (message) {
			toast.success(message);
		}

		if (error) {
			toast.error(error);
		}
	}, [message, error]);

	useEffect(() => {
		// Clean up errors and messages on page unmount.
		return () => dispatch(resetMessageAndError());
	}, []);

	const dispatch = useDispatch<any>();

	return (
		<>
			<BooksTableTools />

			<BooksTable />
		</>
	);
};

export default Books;
