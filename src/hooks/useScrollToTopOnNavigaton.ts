import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export default () => {
	const { pathname } = useLocation();

	window.onbeforeunload = function () {
		window.scrollTo(0, 0);
	};

	useEffect(() => {
		window.scrollTo(0, 0);
	}, [pathname]);

	return null;
};
