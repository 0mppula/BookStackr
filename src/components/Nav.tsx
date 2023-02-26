import { FC } from 'react';
import { NavLink, Link } from 'react-router-dom';

const Nav: FC = () => {
	return (
		<nav>
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
