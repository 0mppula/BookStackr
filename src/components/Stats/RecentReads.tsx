import { useSelector } from 'react-redux';
import { selectRecentlyReadBooks } from '../../features/books/selectors';
import { RootState } from '../../app/store';
import { formatDistance, subDays } from 'date-fns';
import { Fragment } from 'react';

const RecentReads = () => {
	const books = useSelector((state: RootState) => selectRecentlyReadBooks(state));

	return (
		<>
			<div className="stats-header-container" style={{ marginTop: '2rem' }}>
				{books.map((book, i) => {
					if (book) {
						return (
							<div key={book.id} className="recently-read-item">
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

								<hr style={{ width: '80%', margin: '0.5rem 0' }} />

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
								<p>Start reading to display here</p>;
							</div>
						);
					}
				})}
			</div>
		</>
	);
};

export default RecentReads;
