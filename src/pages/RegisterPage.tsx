import React, { SyntheticEvent, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { MAIN_URL } from "../utils/url";
import { UserEntity } from "types";
import ErrorMessage from "../components/ErrorMessage";

const RegisterPage = () => {
	const [form, setForm] = useState({
		id: "",
		name: "",
		email: "",
		password: "",
	});

	const [addedUser, setAddedUser] = useState(false);
	const [users, setUsers] = useState<UserEntity[]>([]);

	const [nameError, setNameError] = useState(false);
	const [emailError, setEmailError] = useState(false);
	const [passwordError, setPasswordError] = useState(false);
	const [errorMessage, setErrorMessage] = useState<string>("");

	useEffect(() => {
		(async () => {
			const res = await fetch(`${MAIN_URL}/register/users`);
			const data = await res.json();

			setUsers(data.userList);
		})();
	}, [addedUser]);

	useEffect(() => {
		const timer = setTimeout(() => {
			setAddedUser(false);
		}, 6000);

		return () => clearInterval(timer);
	}, [addedUser]);

	const validationForm = () => {
		if (
			form.email.length < 5 ||
			!form.email.includes("@") ||
			!form.email.includes(".")
		) {
			setErrorMessage("Nieprawidłowy email");
			setEmailError(true);
		}
		if (form.name.length < 3 || form.name.length > 99) {
			setNameError(true);
		}

		if (form.password.length < 5) {
			setPasswordError(true);
		}

		console.log(users);

		if (users.some(user => user.email === form.email)) {
			setEmailError(true);
			setErrorMessage("Taki email już istnieje.");
		}
	};

	const addUser = async (e: SyntheticEvent) => {
		e.preventDefault();
		if (emailError || nameError || passwordError || errorMessage) {
			return;
		}

		try {
			const res = await fetch(`${MAIN_URL}/register`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(form),
			});

			await res.json();

			setAddedUser(true);
			setForm({ id: "", name: "", email: "", password: "" });
		} catch (e) {
			console.log(e);
		}
	};

	const updateForm = (key: string, value: string) => {
		setAddedUser(false);
		setEmailError(false);
		setNameError(false);
		setPasswordError(false);
		setErrorMessage("");

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
						{nameError && (
							<ErrorMessage errorMessage="Nieprawidłowa nazwa użytkownika" />
						)}
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
						{emailError && <ErrorMessage errorMessage={errorMessage} />}
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
						{passwordError && (
							<ErrorMessage errorMessage="Hasło musi skłądać się z co najmniej 5 znaków" />
						)}
					</label>
					<button
						type="submit"
						className="registerPage__form-button btn"
						onClick={validationForm}
					>
						Zarejestruj
					</button>
					{addedUser && (
						<p className="registerPage__added-success-text">
							Użytkownik został dodany!
						</p>
					)}
				</form>
			</section>
		</>
	);
};

export default RegisterPage;
