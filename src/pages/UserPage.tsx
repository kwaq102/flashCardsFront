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
		<>
			{!logged ? (
				<p>Jesteś niezalogowany</p>
			) : (
				<>
					<h3>Strona użytkownika</h3>
					<Link to="/login">Idź do logowania</Link>
					<Link to="/register">rejestracja</Link>
					<Dictionary />
					<br />
					<br />
					<LogOutButton />
				</>
			)}
		</>
	);
};

export default UserPage;
