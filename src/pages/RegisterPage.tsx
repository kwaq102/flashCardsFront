import React, { SyntheticEvent, useContext, useEffect, useState } from "react";
import { MAIN_URL } from "../utils/url";
import { UserEntity } from "types";
import ErrorMessage from "../components/ErrorMessage";
import SuccessInfo from "../components/SuccessInfo";
import { LoggedContext } from "../App";
import LogOutButton from "./LogOutButton";
import EyePassword from "../components/EyePassword";

const RegisterPage = () => {
	const context = useContext(LoggedContext);
	const { logged } = context;

	const [form, setForm] = useState({
		id: "",
		userName: "",
		email: "",
		password: "",
		password2: "",
	});

	const [addedUser, setAddedUser] = useState(false);
	const [users, setUsers] = useState<UserEntity[]>([]);

	const [nameError, setNameError] = useState(false);
	const [emailError, setEmailError] = useState(false);
	const [passwordError, setPasswordError] = useState(false);
	const [password2Error, setPassword2Error] = useState(false);
	const [errorMessage, setErrorMessage] = useState<string>("");

	// TODO poszukać rozwiązania czy da się to jakoś skrócić
	const [displayPassword, setDisplayPassword] = useState(false);
	const [displayPassword2, setDisplayPassword2] = useState(false);
	const inputType = displayPassword ? "text" : "password";
	const inputType2 = displayPassword2 ? "text" : "password";

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
		if (form.password !== form.password2) {
			setPassword2Error(true);
		}
		if (users.some(user => user.email === form.email)) {
			setEmailError(true);
			setErrorMessage("Taki email już istnieje.");
		}
	};

	const addUser = async (e: SyntheticEvent) => {
		e.preventDefault();

		console.log(form);

		if (
			emailError ||
			nameError ||
			passwordError ||
			password2Error ||
			errorMessage
		) {
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
			setForm({
				id: "",
				userName: "",
				email: "",
				password: "",
				password2: "",
			});
		} catch (e) {
			console.log(e);
		}
	};

	const updateForm = (key: string, value: string) => {
		setAddedUser(false);
		setEmailError(false);
		setNameError(false);
		setPasswordError(false);
		setPassword2Error(false);
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
							<input
								className="registerPage__form-input"
								type={inputType}
								name="password"
								value={form.password}
								onChange={e => updateForm("password", e.target.value)}
							/>
							<EyePassword
								displayPassword={displayPassword}
								setDisplayPassword={setDisplayPassword}
							/>
							{passwordError && (
								<ErrorMessage errorMessage="Hasło musi skłądać się z co najmniej 5 znaków" />
							)}
						</label>
						<label className="registerPage__form-label">
							Powtórz hasło:
							<input
								className="registerPage__form-input"
								type={inputType2}
								name="password2"
								value={form.password2}
								onChange={e => updateForm("password2", e.target.value)}
							/>
							<EyePassword
								displayPassword={displayPassword2}
								setDisplayPassword={setDisplayPassword2}
							/>
							{password2Error && (
								<ErrorMessage errorMessage="Podane hasła różnią się od siebie" />
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
