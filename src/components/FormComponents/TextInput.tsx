import { FC, useRef } from 'react';

interface TextInputProps {
	label: string;
	name: string;
	placeholder: string;
	required?: boolean;
	error?: string;
	value: string;
	handleChange: Function;
	numberInput?: boolean;
	tabIndex?: number;
}

const TextInput: FC<TextInputProps> = ({
	label,
	name,
	placeholder,
	required,
	error,
	value,
	handleChange,
	numberInput,
	tabIndex,
}) => {
	const inputRef = useRef<HTMLInputElement>(null);

	return (
		<>
			<label onClick={() => inputRef?.current?.focus()}>
				{label}
				{required && <span>*</span>}
			</label>
			<input
				value={value}
				onChange={(e) => handleChange(e)}
				ref={inputRef}
				type={numberInput ? 'number' : 'text'}
				name={name}
				placeholder={placeholder}
				tabIndex={tabIndex}
			/>
		</>
	);
};

export default TextInput;
