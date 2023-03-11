import { FC, useEffect, useState } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { FcGoogle } from 'react-icons/fc';

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

			<div>
				<ul>
					<li>
						<NavLink
							className={({ isActive }) => (isActive ? 'active' : '')}
							to="/books"
						>
							Books
						</NavLink>
					</li>
					<li>
						<NavLink
							className={({ isActive }) => (isActive ? 'active' : '')}
							to="/stats"
						>
							Stats
						</NavLink>
					</li>
				</ul>
				<button className="btn-icon">
					Sign in
					<div className="icon-circle">
						<FcGoogle />
					</div>
				</button>
			</div>
		</nav>
	);
};

export default Nav;
