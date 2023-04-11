type CustomCheckboxProps = {
	label: string;
	name: string;
	checked: boolean;
	onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

const CustomCheckbox = ({ label, name, checked, onChange }: CustomCheckboxProps) => {
	return (
		<label className="container">
			{label}
			<input type="checkbox" name={name} checked={checked} onChange={(e) => onChange(e)} />
			<span className="checkmark" />
		</label>
	);
};

export default CustomCheckbox;
