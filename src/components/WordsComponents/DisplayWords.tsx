import React, { FormEvent, MouseEvent, useState } from "react";
import { MAIN_URL } from "../../utils/url";
import { WordEntity } from "types";

interface Props {
	words: WordEntity[];
	onWordsChange: () => void;
}

const DisplayWords = ({ words, onWordsChange }: Props) => {
	const [edit, setEdit] = useState(false);
	const [form, setForm] = useState({
		id: "",
		title: "",
		description: "",
		notes: "",
	});

	const removeWord = async (e: MouseEvent<HTMLButtonElement>) => {
		if (!window.confirm("Czy na pewno?")) return;

		const [wordToRemove] = words.filter(
			word => word.id === e.currentTarget.getAttribute("data-id")
		);

		console.log(e.currentTarget.id);
		console.log(wordToRemove.id);

		const res = await fetch(`${MAIN_URL}/data/remove/${wordToRemove.id}`, {
			method: "DELETE",
		});

		if (res.status === 200 || res.status === 204) {
			onWordsChange();
		}
	};

	const editWordOn = (e: MouseEvent<HTMLButtonElement>) => {
		setEdit(true);
		const [wordToEdit] = words.filter(
			word => word.id === e.currentTarget.getAttribute("data-id")
		);

		if (wordToEdit.id === undefined) return null;

		setForm({
			id: wordToEdit?.id,
			title: wordToEdit?.title,
			description: wordToEdit?.description,
			notes: wordToEdit?.notes,
		});
	};

	const editWord = async (e: FormEvent) => {
		e.preventDefault();

		try {
			if (!window.confirm("Czy chcesz zapisać zmiany?")) return;
			await fetch(`${MAIN_URL}/data/search/${form.id}`, {
				method: "PATCH",
				headers: {
					"Content-type": "application/json",
				},
				body: JSON.stringify({
					id: form.id,
					title: form.title,
					description: form.description,
					notes: form.notes,
				}),
			});
		} catch (e) {
			console.error(e);
		}

		setEdit(false);
		onWordsChange();
		// TODO Poszkać i przypomnieć skąd sie bierze ten refresh
	};
	const updateForm = (key: string, value: string) => {
		setForm(form => ({
			...form,
			[key]: value,
		}));
	};
	const allWords = words
		.sort((prev, curr) => {
			if (prev.title.toUpperCase() < curr.title.toUpperCase()) {
				return -1;
			} else if (prev.title.toUpperCase() > curr.title.toUpperCase()) {
				return 1;
			} else {
				return 0;
			}
		})
		.map((word, i) => (
			<tr key={word.id} className="displayAllWords__table__body__row">
				<th className="displayAllWords__table__body__element ordinal-number">
					{i + 1}
				</th>
				<th className="displayAllWords__table__body__element">{word.title}</th>
				<th className="displayAllWords__table__body__element">
					{word.description}
				</th>
				<th className="displayAllWords__table__body__element">{word.notes}</th>
				<th className="displayAllWords__table__body__element remove">
					<button
						className="displayAllWords__table__body__element-edit btn"
						onClick={editWordOn}
						data-id={word.id}
					>
						Edutuj
					</button>
					<button
						className="displayAllWords__table__body__element-delete btn"
						onClick={removeWord}
						data-id={word.id}
					>
						X
					</button>
				</th>
			</tr>
		));

	return (
		<section className="displayAllWords">
			<h2 className="displayAllWords__heading headingH3">Twój słownik</h2>
			<table className="displayAllWords__table">
				<thead className="displayAllWords__table__heading">
					<tr className="displayAllWords__table__heading__row">
						<th className="displayAllWords__table__heading__element ordinal-number-head">
							L.p.
						</th>
						<th className="displayAllWords__table__heading__element">Tytuł</th>
						<th className="displayAllWords__table__heading__element">
							Znaczenie
						</th>
						<th className="displayAllWords__table__heading__element">
							Notatki
						</th>
					</tr>
				</thead>
				<tbody className="displayAllWords__table__body">{allWords}</tbody>
			</table>
			{edit && (
				<form onSubmit={editWord} className="displayAllWords__edit">
					<label>
						<input
							type="text"
							value={form.title}
							name="title"
							onChange={e => updateForm("title", e.target.value)}
						/>
					</label>
					<label>
						<input
							type="text"
							name="description"
							value={form.description}
							onChange={e => updateForm("description", e.target.value)}
						/>
					</label>
					<label>
						<input
							type="text"
							name="notes"
							value={form.notes}
							onChange={e => updateForm("notes", e.target.value)}
						/>
					</label>
					<button type="submit">Zapisz</button>
				</form>
			)}
		</section>
	);
};

export default DisplayWords;
