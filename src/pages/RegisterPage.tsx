import React, { SyntheticEvent, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { MAIN_URL } from "../utils/url";

const RegisterPage = () => {
	const [form, setForm] = useState({
		id: "",
		name: "",
		email: "",
		password: "",
	});

	const [addedUser, setAddedUser] = useState(false);

	useEffect(() => {
		const timer = setTimeout(() => {
			setAddedUser(false);
		}, 6000);

		return () => clearInterval(timer);
	}, [addedUser]);

	const addUser = async (e: SyntheticEvent) => {
		e.preventDefault();

		try {
			console.log("form");

			const res = await fetch(`${MAIN_URL}/register`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(form),
			});

			const data = await res.json();
			setAddedUser(true);
			setForm({ id: "", name: "", email: "", password: "" });
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
			<section className="registerPage">
				<h2 className="headingH2">Rejestracja nowego użytkownika</h2>

				<form onSubmit={addUser} className="registerPage__form">
					<label className="registerPage__form-label">
						Nazwa użytkownika:
						<br />
						<input
							className="registerPage__form-input"
							type="text"
							name="name"
							value={form.name}
							onChange={e => updateForm("name", e.target.value)}
						/>
					</label>
					<label className="registerPage__form-label">
						E-mail:
						<br />
						<input
							className="registerPage__form-input"
							type="email"
							name="email"
							value={form.email}
							onChange={e => updateForm("email", e.target.value)}
						/>
					</label>
					<label className="registerPage__form-label">
						Hasło:
						<br />
						<input
							className="registerPage__form-input"
							type="password"
							name="password"
							value={form.password}
							onChange={e => updateForm("password", e.target.value)}
						/>
					</label>
					<button type="submit" className="registerPage__form-button btn">
						Zarejestruj
					</button>
					{addedUser && (
						<p className="registerPage__added-success-text">
							Użytkownik został dodany!
						</p>
					)}
				</form>

				{/* <Link to="/user">Pokaż uzytkownika</Link> */}
			</section>
		</>
	);
};

export default RegisterPage;
