import { useEffect } from 'react';

export default (open: boolean, setOpen: Function) => {
	// Hook for closing an element with the "escape" key or by clicking outside of the
	// wrapper element.
	useEffect(() => {
		const handler = (e: any) => {
			if (open) {
				const clickedOutsideWrapper =
					(e.type === 'click' || e.type === 'touchstart') &&
					e.target.className.includes('modal-overlay');

				if (clickedOutsideWrapper || e.key === 'Escape') {
					setOpen(false);
				}
			}
		};

		['click', 'touchstart', 'keydown'].forEach((event) => {
			document.addEventListener(event, handler);
		});

		// Clean up.
		return () => {
			['click', 'touchstart', 'keydown'].forEach((event) => {
				document.removeEventListener(event, handler);
			});
		};
	}, [open]);
};
