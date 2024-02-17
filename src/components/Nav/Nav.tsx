import { FC, useEffect, useState } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { FcGoogle } from 'react-icons/fc';
import { signInWithPopup, signOut } from 'firebase/auth';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { FaSignOutAlt } from 'react-icons/fa';

import { RootState } from '../../app/store';
import { googleProvider, auth } from '../../config/firebase';
import { setLoading } from '../../features/auth/slice';
import { selectAuthState } from '../../features/auth/selectors';

const Nav: FC = () => {
	const [scrolledPastLimit, setScrolledPastLimit] = useState(false);

	const { user } = useSelector((state: RootState) => selectAuthState(state));

	const dispatch = useDispatch();

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

	const handleSignIn = async () => {
		dispatch(setLoading(true));
		try {
			let { user } = await signInWithPopup(auth, googleProvider);
			toast.success(`Welcome, ${user.displayName}!`);
		} catch (error) {
			console.log(error);
		}
		dispatch(setLoading(false));
	};

	const handleSignOut = async () => {
		dispatch(setLoading(true));
		try {
			await signOut(auth);
			toast.success('Signed out.');
		} catch (error) {
			console.log(error);
		}
		dispatch(setLoading(false));
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
						<span className="login-text">Sign in</span>
						<div className="icon-circle">
							<FcGoogle />
						</div>
					</button>
				) : (
					<button onClick={handleSignOut} className="btn-icon">
						<span className="login-text">Sign out</span>
						<FaSignOutAlt />
					</button>
				)}
			</div>
		</nav>
	);
};

export default Nav;
