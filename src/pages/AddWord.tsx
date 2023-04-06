import React, { SyntheticEvent, useContext, useState } from "react";
import { LoggedContext } from "../App";
import { MAIN_URL } from "../utils/url";

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
			const res = await fetch(`${MAIN_URL}/data/add`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ ...form, userId: user.id }),
			});
			console.log("weszło2");

			console.log(form);

			// const data = res.json();
			// console.log(data);

			console.log("dodano nowe słówko");

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
		<>
			<h3>Dodaj nowe słówko</h3>

			<form onSubmit={addWord}>
				<label>
					<input
						type="text"
						placeholder="Nowe słowo..."
						name="title"
						value={form.title}
						onChange={e => updateForm("title", e.target.value)}
					/>
				</label>
				<label>
					<input
						type="text"
						placeholder="Tłumaczenie"
						name="description"
						value={form.description}
						onChange={e => updateForm("description", e.target.value)}
					/>
				</label>
				<label>
					<p>Notatki</p>
					<input
						type="text"
						name="notes"
						value={form.notes}
						onChange={e => updateForm("notes", e.target.value)}
					/>
				</label>
				<button>DOdaj</button>
			</form>
		</>
	);
};

export default AddWord;
