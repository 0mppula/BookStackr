export interface selectItemType {
	value: string | null | any;
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

export interface InputFieldSingleSelectType {
	value: selectItemType | null;
	error: string;
	required: boolean;
}

export interface InputFieldDateType {
	value: Date;
	error: string;
	required: boolean;
}

export interface bookFormDataType {
	author: InputFieldStringType;
	title: InputFieldStringType;
	category: InputFieldSelectType;
	readingMedium: InputFieldSingleSelectType;
	yearRead: InputFieldStringType;
	status: InputFieldSingleSelectType;
}
