import { FC, useRef, useState } from 'react';
import { RiCloseLine } from 'react-icons/ri';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../app/store';

import { bookType } from '../../assets/data/books';
import { bookCategories, bookMediums, bookStatuses } from '../../assets/data/bookSelectValues';
import { addBook, selectBooksCount } from '../../features/BooksSlice';
import useCloseOnOverlayClickOrEsc from '../../hooks/useCloseOnOverlayClickOrEsc';
import useFocusTrap from '../../hooks/useFocusTrap';
import { getInitialBookFormState } from '../FormComponents/FormData';
import FormGroup from '../FormComponents/FormGroup';
import { bookFormDataType, selectItemType } from '../FormComponents/FormTypes';
import SelectInput from '../FormComponents/SelectInput';
import TextInput from '../FormComponents/TextInput';

import './styles.css';

interface AddBookModalProps {
	modalOpen: boolean;
	setModalOpen: Function;
}

const AddBookModal: FC<AddBookModalProps> = ({ modalOpen, setModalOpen }) => {
	const [formData, setFormData] = useState<bookFormDataType>(getInitialBookFormState);
	const booksCount = useSelector((state: RootState) => selectBooksCount(state));

	const outerModalRef = useRef<HTMLDivElement>(null);
	const innerModalRef = useRef<HTMLFormElement>(null);

	const dispatch = useDispatch();

	useCloseOnOverlayClickOrEsc(modalOpen, setModalOpen, 'modal-overlay');
	useFocusTrap(innerModalRef, modalOpen);

	const { author, title, category, readingMedium, yearRead, status } = formData;

	const handleSubmit = () => {
		let error = validateForm();

		if (!error) {
			setModalOpen(false);

			const fake_id = String(
				Math.random().toString(16).slice(2) + Math.random().toString(16).slice(2, 13)
			);

			let book: bookType = {
				id: 'adssadad',
				index: booksCount + 1,
				author: author.value,
				title: title.value,
				yearRead: +yearRead.value,
				category: Array.isArray(category.value)
					? [...category.value]?.map((val) => val.value)
					: [],
				readingMedium: readingMedium?.value?.value,
				status: status?.value?.value,
			};

			dispatch(addBook(book));
		}
	};

	const handleClose = () => {
		setModalOpen(false);
	};

	const validateForm = (): boolean => {
		let error: boolean = false;
		const allFormFields = { ...formData };

		// Loop over the form data fields.
		Object.keys(formData).forEach((key) => {
			const fieldObj = formData[key as keyof bookFormDataType];
			if (fieldObj.required) {
				// Check if required field is not empty.
				if (
					!fieldObj.value ||
					(Array.isArray(fieldObj.value) && fieldObj.value.length === 0)
				) {
					allFormFields[key as keyof bookFormDataType].error = 'This field is required!';
					error = true;
				} else {
					allFormFields[key as keyof bookFormDataType].error = '';
				}
			}
		});
		setFormData({ ...allFormFields });
		return error;
	};

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const field = e.target.name;
		const value = e.target.value;
		const fieldObj = formData[field as keyof bookFormDataType];

		setFormData((prevState) => ({ ...prevState, [field]: { ...fieldObj, value } }));
	};

	const handleSelectMultiChange = (e: selectItemType[], field: string) => {
		const fieldObj = formData[field as keyof bookFormDataType];

		// Set the value of the selection to lowercase.
		const lowerCasedValues = [...e].map((e) => ({ ...e, value: e.value?.toLowerCase() }));

		setFormData((prevState) => ({
			...prevState,
			[field]: { ...fieldObj, value: lowerCasedValues },
		}));
	};

	const handleSelectChange = (e: selectItemType, field: string) => {
		const fieldObj = formData[field as keyof bookFormDataType];

		// Set the value of the selection to lowercase.
		setFormData((prevState) => ({
			...prevState,
			[field]: { ...fieldObj, value: { ...e, value: e.value?.toLowerCase() } },
		}));
	};

	return (
		<div
			className={`modal-overlay ${modalOpen ? 'show' : ''}`}
			aria-modal={modalOpen ? true : false}
			ref={outerModalRef}
		>
			<form className="modal" ref={innerModalRef} onSubmit={(e) => e.preventDefault()}>
				<button
					className="close-container"
					type="button"
					onClick={handleClose}
					tabIndex={modalOpen ? 0 : -1}
				>
					<RiCloseLine />
				</button>

				<div className="modal-header">
					<h2>Add New Book</h2>
				</div>

				<div className="modal-mody">
					<FormGroup>
						<TextInput
							label="Author"
							name="author"
							placeholder="Enter author name..."
							value={author.value}
							error={author.error}
							required={author.required}
							handleChange={handleChange}
							tabIndex={modalOpen ? 0 : -1}
						/>

						<TextInput
							label="Title"
							name="title"
							placeholder="Enter books title name..."
							value={title.value}
							error={title.error}
							required={title.required}
							handleChange={handleChange}
							tabIndex={modalOpen ? 0 : -1}
						/>
					</FormGroup>

					<FormGroup>
						<SelectInput
							label="Category"
							value={category?.value}
							name="category"
							handleChange={handleSelectMultiChange}
							options={bookCategories}
							placeholder="Select book category..."
							isMulti
							isSearchable
							required={category.required}
							error={category.error}
						/>
					</FormGroup>

					<FormGroup>
						<SelectInput
							label="Reading Medium"
							value={readingMedium?.value}
							name="readingMedium"
							handleChange={handleSelectChange}
							options={bookMediums}
							placeholder="Select reading medium..."
							required={readingMedium.required}
							error={readingMedium.error}
						/>

						<SelectInput
							label="Status"
							value={status?.value}
							name="status"
							handleChange={handleSelectChange}
							options={bookStatuses}
							placeholder="Select book status..."
							required={status.required}
							error={status.error}
						/>
					</FormGroup>

					<FormGroup>
						<TextInput
							label="Year Read / Reading"
							name="yearRead"
							placeholder="Enter year read..."
							value={yearRead.value}
							error={yearRead.error}
							required={yearRead.required}
							handleChange={handleChange}
							tabIndex={modalOpen ? 0 : -1}
							numberInput
						/>
					</FormGroup>
				</div>

				<div className="modal-footer">
					<button
						tabIndex={modalOpen ? 0 : -1}
						className="btn btn-block"
						onClick={handleSubmit}
					>
						Add
					</button>
				</div>
			</form>
		</div>
	);
};

export default AddBookModal;
