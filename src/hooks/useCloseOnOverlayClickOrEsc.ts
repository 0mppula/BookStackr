import { useEffect } from 'react';

export default (open: boolean, setOpen: Function, overlayClass: string) => {
	// Hook for closing an element by clicking its overlay wrapper element that is passed in as a
	// parameter or by pressing the "escape" key.
	useEffect(() => {
		const handler = (e: any) => {
			if (open) {
				const clickedOutsideWrapper =
					(e.type === 'mousedown' || e.type === 'touchstart') &&
					typeof e.target.className.includes === 'function' &&
					e.target.className.includes(overlayClass);

				if (clickedOutsideWrapper || e.key === 'Escape') {
					setOpen(false);
				}
			}
		};

		['mousedown', 'touchstart', 'keydown'].forEach((event) => {
			document.addEventListener(event, handler);
		});

		// Clean up.
		return () => {
			['mousedown', 'touchstart', 'keydown'].forEach((event) => {
				document.removeEventListener(event, handler);
			});
		};
	}, [open]);
};
