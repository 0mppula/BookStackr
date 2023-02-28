import { FC, useRef, useState } from 'react';
import { RiCloseLine } from 'react-icons/ri';
import useCloseOnClickOutsideOrEsc from '../../hooks/useCloseOnClickOutsideOrEsc';
import { formDataState } from '../FormComponents/FormData';
import FormGroup from '../FormComponents/FormGroup';
import { AddBookFormDataType } from '../FormComponents/FormTypes';
import TextInput from '../FormComponents/TextInput';

import './styles.css';

interface AddBookModalProps {
	modalOpen: boolean;
	setModalOpen: Function;
}

const AddBookModal: FC<AddBookModalProps> = ({ modalOpen, setModalOpen }) => {
	const [formData, setFormData] = useState<AddBookFormDataType>(formDataState);
	const outerModalRef = useRef<HTMLDivElement>(null);
	const innerModalRef = useRef<HTMLFormElement>(null);

	useCloseOnClickOutsideOrEsc(modalOpen, setModalOpen);

	const { author, title, category, readingMedium, yearRead, status } = formData;

	const handleSave = {};

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const field = e.target.name;
		const value = e.target.value;
		const fieldObj = formData[field as keyof AddBookFormDataType];

		setFormData((prevState) => ({ ...prevState, [field]: { ...fieldObj, value } }));
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
					</FormGroup>

					<FormGroup>
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

					{/* <div className="form-group">
						<label htmlFor="">Category</label>
						<select></select>
					</div> */}

					{/* <div className="form-group">
						<label htmlFor="">Reading Medium</label>
						<select></select>
					</div> */}

					<FormGroup>
						<TextInput
							label="Year Read"
							name="yearRead"
							placeholder="Enter year read..."
							value={yearRead.value}
							error={yearRead.error}
							required
							handleChange={handleChange}
							tabIndex={modalOpen ? 0 : -1}
						/>
					</FormGroup>

					{/* <div className="form-group">
						<label htmlFor="">Status</label>
						<select></select>
					</div> */}
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
