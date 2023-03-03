import React, { SyntheticEvent, useEffect, useState } from "react";
import { redirect } from "react-router-dom";
import { UserEntity } from "types";

const LoginPage = () => {
	const [form, setForm] = useState({
		email: "",
		password: "",
	});

	const [user, setUser] = useState<UserEntity | null>();

	const [errorMsg, setErrorMsg] = useState("");

	const updateForm = (key: string, value: string) => {
		setForm(from => ({
			...form,
			[key]: value,
		}));
	};

	const getUser = async (e: SyntheticEvent) => {
		e.preventDefault();

		try {
			const res = await fetch(`http://localhost:3001/login/${form.email}`);
			const data = await res.json();
			console.log(data);

			if (data === null) {
				setErrorMsg("Nieprawidłowe dane");
			} else {
				console.log(data);

				if (form.password === data.password) {
					setErrorMsg("hasło ok");
					setUser(data);

					// TODO przekierowanie do strony głónej
					// redirect
				} else {
					setErrorMsg("hasło jest nieprawidłowe");
				}
			}
		} catch (error) {
			console.log(error);
		} finally {
			console.log("coś wysłąłem");
			// console.log(form);
		}
	};

	return (
		<section>
			<form onSubmit={getUser}>
				<label>
					Podaj email
					<input
						type="email"
						name="email"
						value={form.email}
						onChange={e => updateForm("email", e.target.value)}
					/>
				</label>
				<label>
					Podaj hasło
					<input
						type="password"
						name="password"
						value={form.password}
						onChange={e => updateForm("password", e.target.value)}
					/>
				</label>
				<button type="submit">Zaloguj</button>
			</form>
			{errorMsg && <p>{errorMsg}</p>}
		</section>
	);
};

export default LoginPage;
