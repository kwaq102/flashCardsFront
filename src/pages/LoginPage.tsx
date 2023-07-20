import React, { SyntheticEvent, useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { LoggedContext } from "../App";
import EyePassword from "../components/EyePassword";
import { MAIN_URL } from "../utils/url";
import ErrorMessage from "../components/ErrorMessage";

const LoginPage = () => {
	const [form, setForm] = useState({
		email: "",
		password: "",
	});
	const [emailError, setEmailError] = useState(false);
	const [passwordError, setPasswordError] = useState(false);

	const [errorMsg, setErrorMsg] = useState("");

	const navigate = useNavigate();

	const updateForm = (key: string, value: string) => {
		setEmailError(false);
		setPasswordError(false);
		setErrorMsg("");
		setForm(form => ({
			...form,
			[key]: value,
		}));
	};

	const context = useContext(LoggedContext);

	const { logged, handleLogIn, user, handleSetUser, handleLogOut } = context;

	const [displayPassword, setDisplayPassword] = useState(false);
	const inputType = displayPassword ? "text" : "password";

	if (logged) {
		return (
			<section className="loginPage page">
				<div className="loginPage__log-info">
					<p className="loginPage__log-info-text">
						Jesteś już zalogowany jako {user ? user.userName : ""}.
					</p>

					<button className="loginPage__log-info__btn btn">
						<Link
							to={`/user/${user?.id}`}
							className="loginPage__link__linkHomePage"
						>
							Strona użytkownika
						</Link>
					</button>
					<button
						onClick={handleLogOut}
						className="loginPage__log-info__btn btn"
					>
						Wyloguj
					</button>
				</div>
			</section>
		);
	}

	const getUser = async (e: SyntheticEvent) => {
		e.preventDefault();

		if (
			form.email.length < 5 ||
			!form.email.includes("@") ||
			!form.email.includes(".")
		) {
			setEmailError(true);
		}

		if (form.password.length < 5) {
			setPasswordError(true);
		}

		if (emailError || passwordError) return;

		try {
			const res = await fetch(`${MAIN_URL}/login/${form.email}`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(form),
			});
			if (res.status === 500) {
				setErrorMsg("Niewłaście dane.");
			}
			const data = await res.json();

			if (data === null) {
				setErrorMsg("Nieprawidłowe dane");
				return;
			} else {
				if (data.error) {
					setPasswordError(true);
					return;
				} else {
					handleSetUser(data);
					localStorage.setItem(
						"user",
						JSON.stringify({
							id: data.id,
							userName: data.userName,
							email: data.email,
						})
					);
					handleLogIn();
					return navigate(`../user/${data.id}`);
				}
			}
		} catch (error) {
			console.error(error);
		}
	};

	return (
		<section className="loginPage page">
			<h2 className="headingH2">Logowanie</h2>
			<form onSubmit={getUser} className="loginPage__form">
				<label className="loginPage__form-label">
					Podaj email
					<br />
					<input
						className="loginPage__form-input"
						type="email"
						name="email"
						value={form.email}
						onChange={e => updateForm("email", e.target.value)}
					/>
				</label>
				{emailError && <ErrorMessage errorMessage="Nieprawidłowy email" />}
				<label className="loginPage__form-label">
					Podaj hasło
					<br />
					<input
						className="loginPage__form-input"
						type={inputType}
						name="password"
						value={form.password}
						onChange={e => updateForm("password", e.target.value)}
					/>
					<EyePassword
						displayPassword={displayPassword}
						setDisplayPassword={setDisplayPassword}
					/>
				</label>
				{passwordError && <ErrorMessage errorMessage="Nieprawiłowe hasło" />}

				<button type="submit" className="loginPage__form-button btn">
					Zaloguj
				</button>
				<p className="loginPage__registerText">
					Nie masz jeszcze konta?{" "}
					<Link
						to="/register"
						className="loginPage__registerText-linkToRegister"
					>
						Załóż je
					</Link>
				</p>
				{errorMsg && <ErrorMessage errorMessage={errorMsg} />}
			</form>
		</section>
	);
};

export default LoginPage;
