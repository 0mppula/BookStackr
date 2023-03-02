import { FC, useRef } from 'react';
import ReactSelect from 'react-select';
import { customTheme, customStyles } from '../../helpers/reactSelectStyles';

import { selectItemType } from './FormTypes';

interface SelectInputProps {
	label: string;
	value: selectItemType[] | null;
	name: string;
	handleChange: Function;
	options: selectItemType[];
	isMulti?: boolean;
	placeholder: string;
	required?: boolean;
	isSearchable?: boolean;
}

const SelectInput: FC<SelectInputProps> = ({
	label,
	value,
	name,
	handleChange,
	options,
	isMulti = false,
	placeholder,
	required,
	isSearchable = false,
}) => {
	const inputRef = useRef<any>(null);
	return (
		<div>
			<label onClick={() => inputRef?.current?.focus()}>
				{label}
				{required && <span>*</span>}
			</label>
			<ReactSelect
				className="react-select-container"
				classNamePrefix="react-select"
				maxMenuHeight={231}
				ref={inputRef}
				value={value}
				onChange={(e) => handleChange(e as any, name)}
				options={options}
				theme={customTheme}
				styles={customStyles}
				placeholder={placeholder}
				isMulti={isMulti}
				isSearchable={isSearchable}
			/>
		</div>
	);
};

export default SelectInput;