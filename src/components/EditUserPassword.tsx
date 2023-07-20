import React, { FormEvent, useState } from "react";
import { MAIN_URL } from "../utils/url";
import SuccessInfo from "./SuccessInfo";
import ErrorMessage from "./ErrorMessage";

interface Props {
	userId: string | undefined;
}

const EditUserPassword = ({ userId }: Props) => {
	const [form, setForm] = useState({
		password: "",
		oldPassword: "",
		newPassword: "",
		newPasswordRepeat: "",
	});

	const [changedPassword, setChangedPassword] = useState(false);
	const [passwordError, setPasswordError] = useState(false);

	// TODO UpdatePassword wynieść gdzieś do utilsów i pote tylko importować w każdym miejscu gdzie jest formularz
	const updateForm = (key: string, value: string) => {
		setForm(form => ({
			...form,
			[key]: value,
		}));
	};

	const editPassword = async (e: FormEvent) => {
		e.preventDefault();

		try {
			if (!window.confirm("Czy chcesz zapisać nowe hasło?")) return;

			if (!userId) {
				console.error("Nie można odnaleźć użytkownika");
				// TODO dodać jakieś info na froncie
				return;
			}

			const res = await fetch(`${MAIN_URL}/user/${userId}`, {
				method: "PATCH",
				headers: {
					"Content-type": "application/json",
				},
				body: JSON.stringify({
					id: userId,
					password: form.oldPassword,
					oldPassword: form.oldPassword,
					newPassword: form.newPassword,
				}),
			});

			const data = await res.json();
			console.log(data);

			if (data.error) {
				setPasswordError(true);
				const timer = setTimeout(() => {
					setPasswordError(false);
				}, 6000);
				return () => clearInterval(timer);
			}

			setForm({
				password: "",
				oldPassword: "",
				newPassword: "",
				newPasswordRepeat: "",
			});

			setChangedPassword(true);
			const timer = setTimeout(() => {
				setChangedPassword(false);
			}, 6000);
			return () => clearInterval(timer);
		} catch (e) {
			console.error(e);
		} finally {
			//TODO loading falses
		}
	};

	return (
		<>
			<form onSubmit={editPassword} className="editPasswordForm">
				<label className="editPasswordForm__password">
					Stare hasło
					<input
						type="text"
						value={form.oldPassword}
						onChange={e => updateForm("oldPassword", e.target.value)}
					/>
				</label>
				<label className="editPasswordForm__password">
					Nowe hasło
					<input
						type="password"
						value={form.newPassword}
						onChange={e => updateForm("newPassword", e.target.value)}
					/>
				</label>
				<label className="editPasswordForm__password">
					Powtórz nowe hasło
					<input
						type="password"
						value={form.newPasswordRepeat}
						onChange={e => updateForm("newPasswordRepeat", e.target.value)}
					/>
				</label>
				<button className="editPasswordForm__button btn">Zapisz</button>
			</form>
			<div className="resultInfo">
				{changedPassword && <SuccessInfo text="Hasło zostało zmienione" />}
				{passwordError && <ErrorMessage errorMessage="Nieprawidłowe hasło" />}
			</div>
		</>
	);
};

export default EditUserPassword;
