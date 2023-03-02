import { FC, useRef, useState } from 'react';
import { RiCloseLine } from 'react-icons/ri';
import { bookCategories, bookMediums, bookStatuses } from '../../assets/data/bookSelectValues';

import useCloseOnOverlayClickOrEsc from '../../hooks/useCloseOnOverlayClickOrEsc';
import useFocusTrap from '../../hooks/useFocusTrap';
import { AddBookFormDataState } from '../FormComponents/FormData';
import FormGroup from '../FormComponents/FormGroup';
import { AddBookFormDataType, selectItemType } from '../FormComponents/FormTypes';
import SelectInput from '../FormComponents/SelectInput';
import TextInput from '../FormComponents/TextInput';

import './styles.css';

interface AddBookModalProps {
	modalOpen: boolean;
	setModalOpen: Function;
}

const AddBookModal: FC<AddBookModalProps> = ({ modalOpen, setModalOpen }) => {
	const [formData, setFormData] = useState<AddBookFormDataType>(AddBookFormDataState);

	const outerModalRef = useRef<HTMLDivElement>(null);
	const innerModalRef = useRef<HTMLFormElement>(null);

	useCloseOnOverlayClickOrEsc(modalOpen, setModalOpen, 'modal-overlay');
	useFocusTrap(innerModalRef, modalOpen);

	const { author, title, category, readingMedium, yearRead, status } = formData;

	const handleSave = {};

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const field = e.target.name;
		const value = e.target.value;
		const fieldObj = formData[field as keyof AddBookFormDataType];

		setFormData((prevState) => ({ ...prevState, [field]: { ...fieldObj, value } }));
	};

	const handleSelectMultiChange = (e: selectItemType[], field: string) => {
		const fieldObj = formData[field as keyof AddBookFormDataType];

		// Set the value of the selection to lowercase.
		const lowerCasedValues = [...e].map((e) => ({ ...e, value: e.value?.toLowerCase() }));

		setFormData((prevState) => ({
			...prevState,
			[field]: { ...fieldObj, value: lowerCasedValues },
		}));
	};

	const handleSelectChange = (e: selectItemType, field: string) => {
		const fieldObj = formData[field as keyof AddBookFormDataType];

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
					onClick={(e) => setModalOpen(false)}
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
							required
							handleChange={handleChange}
							tabIndex={modalOpen ? 0 : -1}
						/>

						<TextInput
							label="Title"
							name="title"
							placeholder="Enter books title name..."
							value={title.value}
							error={title.error}
							required
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
							required
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
							required
						/>

						<SelectInput
							label="Status"
							value={status?.value}
							name="status"
							handleChange={handleSelectChange}
							options={bookStatuses}
							placeholder="Select book status..."
							required
						/>
					</FormGroup>

					<FormGroup>
						<TextInput
							label="Year Read / Reading"
							name="yearRead"
							placeholder="Enter year read..."
							value={yearRead.value}
							error={yearRead.error}
							required
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
						onClick={() => handleSave}
					>
						Add
					</button>
				</div>
			</form>
		</div>
	);
};

export default AddBookModal;
