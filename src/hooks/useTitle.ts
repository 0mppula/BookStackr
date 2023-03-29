import { useEffect } from 'react';

/* Hook for changing the title */
export const useTitle = (title: string) => {
	useEffect((): (() => void) => {
		const defaultTitle = document.title;
		const appTitle = 'BookStackr';
		title && (document.title = `${title} - ${appTitle}`);
		// following line is optional, but will reset title when component unmounts
		return () => (document.title = defaultTitle);
	}, [title]);
};
