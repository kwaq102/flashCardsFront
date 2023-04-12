import React, { SyntheticEvent, useState } from "react";
import { Link } from "react-router-dom";
import { MAIN_URL } from "../utils/url";

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
			console.log("form");

			const res = await fetch(`${MAIN_URL}/register`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(form),
			});
			console.log("form2");

			const data = await res.json();

			// console.log(data);
		} catch (e) {
			console.log(e);
		} finally {
			console.log("Wysłano");
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
				</form>
				{/* <Link to="/user">Pokaż uzytkownika</Link> */}
			</section>
		</>
	);
};

export default RegisterPage;
