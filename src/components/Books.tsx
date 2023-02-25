import { FC } from 'react';
import { books } from '../assets/data/books';

const Books: FC = () => {
	return (
		<div>
			{books.map((b) => (
				<p>{b.title}</p>
			))}
		</div>
	);
};

export default Books;
