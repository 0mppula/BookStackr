import { FC, useEffect, useState } from 'react';
import { NavLink, Link } from 'react-router-dom';

const Nav: FC = () => {
	const [scrolledPastLimit, setScrolledPastLimit] = useState(false);

	useEffect(() => {
		const handler = () => {
			const limit = 52;

			if (window.scrollY >= limit) {
				setScrolledPastLimit(true);
			} else {
				setScrolledPastLimit(false);
			}
		};

		document.addEventListener('scroll', handler);

		return () => document.removeEventListener('scroll', handler);
	}, []);

	return (
		<nav className={`${scrolledPastLimit ? 'scrolled' : ''}`}>
			<Link className="app-name" to="/">
				<h1>BookStackr</h1>
			</Link>

			<ul>
				<li>
					<NavLink className={({ isActive }) => (isActive ? 'active' : '')} to="/books">
						Books
					</NavLink>
				</li>
				<li>
					<NavLink className={({ isActive }) => (isActive ? 'active' : '')} to="/stats">
						Stats
					</NavLink>
				</li>
			</ul>
		</nav>
	);
};

export default Nav;
