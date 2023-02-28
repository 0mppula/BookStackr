import { FC, ReactNode } from 'react';

interface FormGroupProps {
	children: ReactNode;
}

const FormGroup: FC<FormGroupProps> = ({ children }) => {
	return <div className="form-group">{children}</div>;
};

export default FormGroup;
