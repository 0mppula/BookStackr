import { FC, useEffect, useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { ToastContainer } from 'react-toastify';

import Books from './Pages/Books/Books';
import Stats from './Pages/Stats/Stats';
import Nav from './components/Nav/Nav';
import Footer from './components/Footer/Footer';
import ScrollToTop from './components/ScrollToTop/ScrollToTop';
import useScrollToTopOnNavigaton from './hooks/useScrollToTopOnNavigaton';
import { auth } from './config/firebase';
import { signIn, signOut } from './features/auth/slice';
import { RootState } from './app/store';
import Loader from './components/Loader/Loader';
import { getBooks } from './features/books/slice';
import { selectAuthState } from './features/auth/selectors';
import { selectBooksLoadingState } from './features/books/selectors';

const App: FC = () => {
	useScrollToTopOnNavigaton();
	const [userInitialized, setUserInitialized] = useState(false);

	const { user, loading } = useSelector((state: RootState) => selectAuthState(state));
	const booksLoading = useSelector((state: RootState) => selectBooksLoadingState(state));

	const dispatch = useDispatch<any>();

	// Handle login persistency.
	useEffect(() => {
		const unsubscribe = auth.onAuthStateChanged((userAuth) => {
			if (userAuth) {
				const { email, uid, displayName } = userAuth;

				dispatch(signIn({ email, uid, displayName }));
			} else {
				dispatch(signOut());
			}

			if (!userInitialized) {
				setUserInitialized(true);
			}
		});

		return unsubscribe;
	}, []);

	useEffect(() => {
		if (userInitialized) {
			// Get books after firebase auth has been checked.
			dispatch(getBooks());
		}
	}, [userInitialized, user]);

	return (
		<>
			{(loading || booksLoading) && <Loader />}

			<Nav />
			<div className="app-container">
				<Routes>
					<Route path="/books" element={<Books />} />
					<Route path="/stats" element={<Stats />} />
					<Route path="*" element={<Navigate replace to="/books" />} />
				</Routes>

				<ScrollToTop />
			</div>

			<Footer />

			<ToastContainer limit={3} autoClose={3000} pauseOnFocusLoss={false} />
		</>
	);
};

export default App;
