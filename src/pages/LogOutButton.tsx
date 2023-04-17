import React, { useContext } from "react";
import { LoggedContext } from "../App";
import { useNavigate } from "react-router-dom";

const LogOutButton = () => {
	const context = useContext(LoggedContext);
	const navigate = useNavigate();

	const { handleLogOut } = context;

	return (
		<div
			onClick={() => {
				handleLogOut();
				navigate(`../login`);
			}}
			className="userPage__button btn"
		>
			Wyloguj
		</div>
	);
};

export default LogOutButton;
