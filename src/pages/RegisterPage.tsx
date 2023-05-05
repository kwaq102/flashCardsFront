import React, { SyntheticEvent, useContext, useEffect, useState } from "react";
import { MAIN_URL } from "../utils/url";
import { UserEntity } from "types";
import ErrorMessage from "../components/ErrorMessage";
import SuccessInfo from "../components/SuccessInfo";
import { LoggedContext } from "../App";
import LogOutButton from "./LogOutButton";

const RegisterPage = () => {
	const context = useContext(LoggedContext);
	const { logged } = context;

	const [form, setForm] = useState({
		id: "",
		userName: "",
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
		if (form.userName.length < 3 || form.userName.length > 99) {
			setNameError(true);
		}

		if (form.password.length < 5) {
			setPasswordError(true);
		}
		if (users.some(user => user.email === form.email)) {
			setEmailError(true);
			setErrorMessage("Taki email już istnieje.");
		}
	};

	const addUser = async (e: SyntheticEvent) => {
		e.preventDefault();

		console.log(form);

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
			setForm({ id: "", userName: "", email: "", password: "" });
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
			<section className="registerPage page">
				<h2 className="headingH2">Rejestracja nowego użytkownika</h2>

				{logged ? (
					<div className="registerPage__log-info">
						<p className="registerPage__log-info-text">
							Aby zarejestrować nowego użytkownika nie można być zalogowanym
						</p>
						<LogOutButton />
					</div>
				) : (
					<form onSubmit={addUser} className="registerPage__form">
						<label className="registerPage__form-label">
							Nazwa użytkownika:
							<br />
							<input
								className="registerPage__form-input"
								type="text"
								name="userName"
								value={form.userName}
								onChange={e => updateForm("userName", e.target.value)}
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
						{addedUser && <SuccessInfo text="Użytkownik został dodany!" />}
					</form>
				)}
			</section>
		</>
	);
};

export default RegisterPage;
