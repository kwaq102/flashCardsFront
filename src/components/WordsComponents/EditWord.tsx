import React, { Dispatch, FormEvent, SetStateAction } from "react";

interface Props {
	form: {
		id: string;
		title: string;
		description: string;
		notes: string;
	};
	setForm: Dispatch<
		SetStateAction<{
			id: string;
			title: string;
			description: string;
			notes: string;
		}>
	>;
	editWord: (e: FormEvent) => void;
	setEdit: Dispatch<SetStateAction<boolean>>;
	marginForm: number;
}

const EditWord = ({ editWord, form, setForm, marginForm, setEdit }: Props) => {
	const updateForm = (key: string, value: string) => {
		setForm(form => ({
			...form,
			[key]: value,
		}));
	};
	return (
		<>
			<div className="displayAllWords__edit__form-wrapper">
				<form
					onSubmit={editWord}
					className="displayAllWords__edit__form"
					style={{
						top: marginForm,
					}}
				>
					<label className="displayAllWords__edit__form__label">
						<fieldset className="displayAllWords__edit__form__fieldset">
							<legend className="displayAllWords__edit__form__legend">
								Title
							</legend>

							<input
								type="text"
								value={form.title}
								name="title"
								onChange={e => updateForm("title", e.target.value)}
								className="displayAllWords__edit__form__input"
							/>
						</fieldset>
					</label>
					<label className="displayAllWords__edit__form__label">
						<fieldset className="displayAllWords__edit__form__fieldset">
							<legend className="displayAllWords__edit__form__legend">
								Description
							</legend>
							<input
								type="text"
								name="description"
								value={form.description}
								onChange={e => updateForm("description", e.target.value)}
								className="displayAllWords__edit__form__input"
							/>
						</fieldset>
					</label>
					<label className="displayAllWords__edit__form__label">
						<fieldset className="displayAllWords__edit__form__fieldset">
							<legend className="displayAllWords__edit__form__legend">
								Notes
							</legend>
							<textarea
								name="notes"
								value={form.notes}
								onChange={e => updateForm("notes", e.target.value)}
								className="displayAllWords__edit__form__textarea"
							/>
						</fieldset>
					</label>
					<button
						type="submit"
						className="displayAllWords__edit__form__btn btn"
					>
						Zapisz
					</button>
					<button
						onClick={() => setEdit(false)}
						className="displayAllWords__edit__form__btn-close btn"
					>
						Anuluj
					</button>
				</form>
			</div>
		</>
	);
};

export default EditWord;
