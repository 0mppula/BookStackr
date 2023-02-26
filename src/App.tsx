import { FC } from 'react';
import Books from './components/Books';

const App: FC = () => {
	return (
		<div className="app-container">
			<h1>BookStackr</h1>

			<Books />
		</div>
	);
};

export default App;
