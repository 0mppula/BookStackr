import { FC, ReactNode } from 'react';

interface FormGroupProps {
	children: ReactNode;
}

const FormGroup: FC<FormGroupProps> = ({ children }) => {
	return (
		<div className="form-group">
			<div className="input-group-container">{children}</div>
		</div>
	);
};

export default FormGroup;
