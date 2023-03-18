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

export interface addBookReqBodyType {
	userId?: string;
	index: number;
	author: string;
	title: string;
	category: Array<string>;
	readingMedium: string;
	yearRead: number;
	status: string;
}

export interface editBookReqBodyType {
	id: string;
	userId?: string;
	index: number;
	author: string;
	title: string;
	category: Array<string>;
	readingMedium: string;
	yearRead: number;
	status: string;
}
