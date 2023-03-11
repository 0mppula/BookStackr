import { FC } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

import Books from './Pages/Books/Books';
import Stats from './Pages/Stats/Stats';
import Nav from './components/Nav/Nav';
import Footer from './components/Footer/Footer';
import ScrollToTop from './components/ScrollToTop/ScrollToTop';

const App: FC = () => {
	return (
		<>
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
