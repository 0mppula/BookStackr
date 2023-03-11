import { FC, useState } from 'react';
import { FaChevronUp } from 'react-icons/fa';

import './styles.css';

const ScrollToTop: FC = () => {
	const [active, setActive] = useState(false);

	window.addEventListener('scroll', () => {
		// Limit in y-axis pixels when to show scroll to top element
		const SCROLL_LIMIT = 200;

		let pageY = window.pageYOffset;
		pageY > SCROLL_LIMIT && setActive(true);
		pageY < SCROLL_LIMIT && setActive(false);
	});

	const scrollToTop = () => {
		window.scrollTo({
			top: 0,
			left: 0,
			behavior: 'smooth',
		});
	};

	return (
		<button
			tabIndex={active ? 0 : -1}
			onClick={scrollToTop}
			className={`to-top-button ${active ? 'active' : ''}`}
		>
			<FaChevronUp />
		</button>
	);
};

export default ScrollToTop;
