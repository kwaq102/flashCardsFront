import React, { useContext, useState } from "react";
import { LoggedContext } from "../App";
import EditUserPassword from "./EditUserPassword";

const UserInfo = () => {
	const context = useContext(LoggedContext);
	const { user } = context;

	const [editPassword, setEditPassword] = useState(false);

	const btnText = editPassword ? "zamknij" : "zmień hasło";

	return (
		<section className="userInfo">
			<h4 className="userInfo__title">Informacje o użytkowniku</h4>

			<div className="userInfo__box">
				<div className="userInfo__details">
					<p className="userInfo__userName">{user?.userName}</p>
					<p className="userInfo__userEmail">{user?.email}</p>
					<button
						className="userInfo__editPasswordButton btn"
						onClick={() => {
							setEditPassword(!editPassword);
						}}
					>
						{btnText}
					</button>
				</div>
				<div
					className={`userInfo__changePasswordBox ${
						editPassword ? "displayEdit" : ""
					}`}
				>
					{editPassword && <EditUserPassword userId={user?.id} />}
				</div>
			</div>
		</section>
	);
};

export default UserInfo;
