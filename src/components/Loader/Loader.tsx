import { FC } from 'react';
import { ImSpinner2 } from 'react-icons/im';

const Loader: FC = () => {
	return (
		<div className="loader">
			<div className="loader-icon">
				<ImSpinner2 />
			</div>
		</div>
	);
};

export default Loader;
