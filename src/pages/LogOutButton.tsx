import React, { useContext } from "react";
import { LoggedContext } from "../App";

const LogOutButton = () => {
	const context = useContext(LoggedContext);

	const { handleLogOut } = context;

	return <div onClick={handleLogOut}>Wyloguj</div>;
};

export default LogOutButton;
