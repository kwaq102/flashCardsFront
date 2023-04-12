import { useContext } from "react";
import { LoggedContext } from "../App";
import { Link, useNavigate } from "react-router-dom";
import Dictionary from "./Dictionary";
import LogOutButton from "./LogOutButton";

const UserPage = () => {
	const context = useContext(LoggedContext);
	const navigate = useNavigate();

	const { logged, handleLogIn, user } = context;

	return (
		<section className="userPage">
			{!logged ? (
				<p>Jesteś niezalogowany</p>
			) : (
				<>
					<h2 className="headingH2">Strona użytkownika</h2>
					<Dictionary />
					<br />
					<br />
					<LogOutButton />
				</>
			)}
		</section>
	);
};

export default UserPage;
