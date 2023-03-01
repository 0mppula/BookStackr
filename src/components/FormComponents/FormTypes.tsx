export interface selectItemType {
	value: string | null;
	label: string;
}

export interface InputFieldStringType {
	value: string;
	error: string;
	required: boolean;
}

export interface InputFieldSelectType {
	value: selectItemType[] | null;
	error: string;
	required: boolean;
}

export interface InputFieldDateType {
	value: Date;
	error: string;
	required: boolean;
}

export interface AddBookFormDataType {
	author: InputFieldStringType;
	title: InputFieldStringType;
	category: InputFieldSelectType;
	readingMedium: InputFieldSelectType;
	yearRead: InputFieldStringType;
	status: InputFieldSelectType;
}
