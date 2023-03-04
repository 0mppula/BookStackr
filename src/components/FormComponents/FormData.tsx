import { bookFormDataType } from './FormTypes';

export const getInitialBookFormState = (): bookFormDataType => ({
	author: { value: '', error: '', required: true },
	title: { value: '', error: '', required: true },
	category: {
		value: null,
		error: '',
		required: true,
	},
	readingMedium: {
		value: null,
		error: '',
		required: true,
	},
	yearRead: { value: '', error: '', required: true },
	status: {
		value: null,
		error: '',
		required: true,
	},
});

export const getPopulatedBookFormState = (formData: bookFormDataType) => ({});
