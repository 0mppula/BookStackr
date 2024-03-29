import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';

import 'react-toastify/dist/ReactToastify.css';
import './assets/styles/index.css';
import './assets/styles/modal-styles.css';
import './assets/styles/react-select-styles.css';
import './assets/styles/loader.css';
import './assets/styles/react-toastify.css';

import App from './App';
import { store } from './app/store';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
	<React.StrictMode>
		<Provider store={store}>
			<Router>
				<App />
			</Router>
		</Provider>
	</React.StrictMode>
);
