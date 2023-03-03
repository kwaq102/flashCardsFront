import React, { SyntheticEvent, useState } from "react";

const RegisterPage = () => {
	const [form, setForm] = useState({
		id: "",
		name: "",
		email: "",
		password: "",
	});

	const addUser = async (e: SyntheticEvent) => {
		e.preventDefault();

		try {
			console.log(form);

			const res = await fetch("http://localhost:3001/register", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(form),
			});

			const data = await res.json();

			console.log(data);
		} catch (e) {
			console.log(e);
		} finally {
			console.log("WYsłano");
		}
	};

	const updateForm = (key: string, value: string) => {
		setForm(from => ({
			...form,
			[key]: value,
		}));
	};

	return (
		<section>
			<form onSubmit={addUser}>
				<label>
					Nazwa użytkownika:
					<input
						type="text"
						name="name"
						value={form.name}
						onChange={e => updateForm("name", e.target.value)}
					/>
				</label>
				<label>
					E-mail:
					<input
						type="email"
						name="email"
						value={form.email}
						onChange={e => updateForm("email", e.target.value)}
					/>
				</label>
				<label>
					Hasło:
					<input
						type="password"
						name="password"
						value={form.password}
						onChange={e => updateForm("password", e.target.value)}
					/>
				</label>
				<button type="submit">Zapisz</button>
			</form>
		</section>
	);
};

export default RegisterPage;
