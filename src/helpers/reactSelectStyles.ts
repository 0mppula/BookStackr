import { cssVar } from './getCssVariable';

export const customStyles = {
	control: (provided: any, state: any) => ({
		...provided,
		// Outline of the select element when when focused and blurred
		outline: state.isFocused
			? `2px solid ${cssVar('--light')}`
			: `2px solid ${cssVar('--light-alt')}`,
	}),
};

export const customTheme = (theme: any) => ({
	...theme,
	colors: {
		...theme.colors,
		// Hovering over select list item background color
		primary25: cssVar('--dark'),
		// Selected list items background color
		primary: cssVar('--dark-alt'),
		// Hover color of the drop down arrow toggler
		neutral40: cssVar('--light'),
		// Color of the drop down arrow toggler
		neutral20: cssVar('--light-alt'),
		// input text color
		neutral80: cssVar('--light'),
	},
});
