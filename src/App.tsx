import { FC, useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import Books from './Pages/Books/Books';
import Stats from './Pages/Stats/Stats';
import Nav from './components/Nav/Nav';
import Footer from './components/Footer/Footer';
import ScrollToTop from './components/ScrollToTop/ScrollToTop';
import useScrollToTopOnNavigaton from './hooks/useScrollToTopOnNavigaton';
import { auth } from './config/firebase';
import { signIn, signOut } from './features/auth/authSlice';
import { RootState } from './app/store';
import Loader from './components/Loader/Loader';

const App: FC = () => {
	useScrollToTopOnNavigaton();
	const { loading } = useSelector((state: RootState) => state.auth);

	const dispatch = useDispatch();

	// Handle login persistency.
	useEffect(() => {
		const unsubscribe = auth.onAuthStateChanged((userAuth) => {
			if (userAuth) {
				const { email, uid, displayName } = userAuth;

				dispatch(signIn({ email, uid, displayName }));
			} else {
				dispatch(signOut());
			}
		});

		return unsubscribe;
	}, []);

	return (
		<>
			{loading && <Loader />}

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
		</>
	);
};

export default App;
