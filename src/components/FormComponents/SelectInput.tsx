import { FC, useRef } from 'react';
import ReactSelect from 'react-select';
import { customTheme, customStyles } from '../../helpers/reactSelectStyles';

import { selectItemType } from './FormTypes';

interface SelectInputProps {
	label: string;
	value: selectItemType[] | selectItemType | null;
	name: string;
	handleChange: Function;
	options: selectItemType[];
	isMulti?: boolean;
	placeholder: string;
	required?: boolean;
	isSearchable?: boolean;
	error?: string;
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
	error,
}) => {
	const inputRef = useRef<any>(null);
	return (
		<div className="input-group">
			<label onClick={() => inputRef?.current?.focus()}>
				{label}
				{required && <span>*</span>}
			</label>
			<ReactSelect
				className="react-select-container"
				classNamePrefix="react-select"
				maxMenuHeight={224}
				minMenuHeight={150}
				ref={inputRef}
				value={value}
				onChange={(e) => handleChange(e as any, name)}
				options={options.sort((a, b) => (a.label > b.label ? 1 : -1))}
				theme={customTheme}
				styles={customStyles}
				placeholder={placeholder}
				isMulti={isMulti}
				isOptionSelected={(option, selectValue) => {
					if (!isMulti) {
						return selectValue[0]?.value === option.value && selectValue?.length > 0;
					}

					return selectValue.some((sv) => sv.label === option.label);
				}}
				isSearchable={isSearchable}
			/>

			<div className="error">{error}</div>
		</div>
	);
};

export default SelectInput;
