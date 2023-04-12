import React, { SyntheticEvent, useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { LoggedContext } from "../App";
import { UserEntity } from "types";

const LoginPage = () => {
	const [form, setForm] = useState({
		email: "",
		password: "",
	});

	const [errorMsg, setErrorMsg] = useState("");

	const navigate = useNavigate();

	const updateForm = (key: string, value: string) => {
		setForm(form => ({
			...form,
			[key]: value,
		}));
	};

	const context = useContext(LoggedContext);

	//TODO spróbować przekierować od razu pod id
	const { logged, handleLogIn, user, handleSetUser } = context;
	if (logged) {
		// TODO porbać za id użytkownika
		return (
			<>
				<p>jesteś już zalogowany</p>
				<Link to="/user/:id">Przejdź do strony głównej</Link>
			</>
		);
	}

	const getUser = async (e: SyntheticEvent) => {
		e.preventDefault();

		try {
			const res = await fetch(`http://localhost:3001/login/${form.email}`);
			const data = await res.json();

			if (data === null) {
				return setErrorMsg("Nieprawidłowe dane");
			} else {
				if (form.password === data.password) {
					setErrorMsg("hasło ok");

					handleSetUser(data);
					handleLogIn();

					return navigate(`../user/${data.id}`);
				} else {
					return setErrorMsg("hasło jest nieprawidłowe");
				}
			}
		} catch (error) {
			console.error(error);
		}
	};

	return (
		<section className="loginPage">
							<h2 className="headingH2">Logowanie</h2>
			<form onSubmit={getUser} className="loginPage__form">
				<label className="loginPage__form-label">
					Podaj email
					<br/>
					<input
					className="loginPage__form-input"
						type="email"
						name="email"
						value={form.email}
						onChange={e => updateForm("email", e.target.value)}
					/>
				</label>
				<label className="loginPage__form-label">
					Podaj hasło
					<br/>
					<input
					className="loginPage__form-input"
						type="password"
						name="password"
						value={form.password}
						onChange={e => updateForm("password", e.target.value)}
					/>
				</label>
				<button type="submit" className="loginPage__form-button btn">Zaloguj</button>
			<p className="loginPage__registerText">Nie masz jeszcze konta? <Link to="/register" className="loginPage__registerText-linkToRegister">Załóż je</Link></p>
			</form>
			{errorMsg && <p>{errorMsg}</p>}
		</section>
	);
};

export default LoginPage;
