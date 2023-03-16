import { FC, useEffect, useState } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { FcGoogle } from 'react-icons/fc';

import { useDispatch, useSelector } from 'react-redux';
import { signIn, signOut } from '../../features/auth/authSlice';
import { RootState } from '../../app/store';

const Nav: FC = () => {
	const [scrolledPastLimit, setScrolledPastLimit] = useState(false);

	const { user, loading, message } = useSelector((state: RootState) => state.auth);

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

	const dispatch = useDispatch<any>();

	const handleSignIn = async () => {
		dispatch(signIn());
	};

	const handleSignOut = async () => {
		dispatch(signOut());
	};

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

				{!user ? (
					<button onClick={handleSignIn} className="btn-icon">
						Sign in
						<div className="icon-circle">
							<FcGoogle />
						</div>
					</button>
				) : (
					<button onClick={handleSignOut} className="btn-icon">
						Sign out
						<div className="icon-circle">
							<FcGoogle />
						</div>
					</button>
				)}
			</div>
		</nav>
	);
};

export default Nav;
