import React, { Dispatch, SetStateAction } from "react";
import { Link } from "react-router-dom";
import Navigation from "./Navigation";
import { UserEntity } from "types";

interface Props {
	logged: boolean;
	handleLogOut: () => void;
	user: UserEntity | null;
	showNav: boolean;
	setShowNav: Dispatch<SetStateAction<boolean>>;
}

const Banner = ({ logged, handleLogOut, user, showNav, setShowNav }: Props) => {
	return (
		<div className="App__bannerTop">
			{logged ? (
				<Link to="/" className="App__bannerTop__btn" onClick={handleLogOut}>
					Wyloguj
				</Link>
			) : (
				<Link to="/login" className="App__bannerTop__btn">
					Zaloguj
				</Link>
			)}

			<Navigation user={user} showNav={showNav} setShowNav={setShowNav} />
		</div>
	);
};

export default Banner;
