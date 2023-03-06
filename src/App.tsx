import { FC } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

import Books from './Pages/Books/Books';
import Stats from './Pages/Stats/Stats';
import Nav from './components/Nav/Nav';

const App: FC = () => {
	return (
		<div className="app-container">
			<Nav />

			<Routes>
				<Route path="/books" element={<Books />} />
				<Route path="/stats" element={<Stats />} />
				<Route path="*" element={<Navigate replace to="/books" />} />
			</Routes>
		</div>
	);
};

export default App;
