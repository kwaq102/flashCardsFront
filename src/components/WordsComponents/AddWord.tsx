import React, { SyntheticEvent, useContext, useState } from "react";
import { LoggedContext } from "../../App";
import { MAIN_URL } from "../../utils/url";

const AddWord = () => {
	const [form, setForm] = useState({
		title: "",
		description: "",
		notes: "",
	});

	const clearForm = () => {
		setForm({
			title: "",
			description: "",
			notes: "",
		});
	};

	const context = useContext(LoggedContext);
	const { logged, user } = context;
	if (!user) return null;

	const addWord = async (e: SyntheticEvent) => {
		e.preventDefault();

		if (!logged) return null;

		try {
			await fetch(`${MAIN_URL}/data/add/${user.id}`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(form),
			});
			clearForm();
		} catch (e) {
			console.log(e);
		}
	};

	const updateForm = (key: string, value: string) => {
		setForm(form => ({
			...form,
			[key]: value,
		}));
	};

	return (
		<section className="addWord">
			<h3 className="headingH3">Dodaj nowe słówko</h3>

			<form onSubmit={addWord} className="addWord__form">
				<label className="addWord__form-label">
					<input
						className="addWord__form-input"
						type="text"
						placeholder="Nowe słowo..."
						name="title"
						value={form.title}
						onChange={e => updateForm("title", e.target.value)}
					/>
				</label>
				<label className="addWord__form-label">
					<input
						className="addWord__form-input"
						type="text"
						placeholder="Tłumaczenie"
						name="description"
						value={form.description}
						onChange={e => updateForm("description", e.target.value)}
					/>
				</label>
				<label className="addWord__form-label">
					<p className="addWord__notes">Notatki</p>
					<textarea
						className="addWord__form-input"
						name="notes"
						value={form.notes}
						onChange={e => updateForm("notes", e.target.value)}
					/>
				</label>
				<button className="addWord__form-button btn">Dodaj</button>
			</form>
		</section>
	);
};

export default AddWord;
