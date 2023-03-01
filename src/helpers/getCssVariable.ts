export const cssVar = (variable: string) => {
	return `${getComputedStyle(document.body).getPropertyValue(variable)}`;
};
