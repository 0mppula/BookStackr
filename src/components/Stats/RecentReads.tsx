import { formatDistance } from 'date-fns';
import { Fragment } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../app/store';
import { selectRecentlyReadBooks } from '../../features/books/selectors';

const RecentReads = () => {
	const books = useSelector((state: RootState) => selectRecentlyReadBooks(state));

	return (
		<>
			<div className="stats-header-container">
				{books.map((book, i) => {
					if (book) {
						return (
							<div key={book.id} className="recently-read-item">
								<div>
									<p>
										Read{' '}
										{formatDistance(
											new Date(book.lastReadAt as string),
											new Date(),
											{
												addSuffix: true,
											}
										)}
									</p>

									<h2>{book.title}</h2>
									<p>By: {book.author}</p>
								</div>

								<hr />

								<div>
									{book.category.map((category: string, i: number) => (
										<Fragment key={`category-${category}`}>
											<a
												className="table-book-category"
												href={`https://www.goodreads.com/genres/${category.replaceAll(
													' ',
													'-'
												)}`}
												target="_blank"
											>
												{category}
											</a>

											{/* Ensure no trailing comma. */}
											{i === book.category.length - 1 ? '' : ', '}
										</Fragment>
									))}
								</div>
							</div>
						);
					} else {
						return (
							<div key={`book-${i}`} className="recently-read-item">
								<p className="no-books">
									Read more books to display a recent read here.
								</p>
							</div>
						);
					}
				})}
			</div>
		</>
	);
};

export default RecentReads;
