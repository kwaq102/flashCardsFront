import React, { useId } from "react";
import { NavLink } from "react-router-dom";
import { navList } from "../utils/navigationList";
import { UserEntity } from "types";

interface Props {
	user: UserEntity | null;
}

const Navigation = ({ user }: Props) => {
	const userIdPath = user?.id ? user.id : "";

	const navigation = navList.map(el => (
		<li className="navigation__list__element-link">
			<NavLink
				to={el.path}
				end={el.end}
				className="navigation__list__element-link"
			>
				{el.navName}
			</NavLink>
		</li>
	));

	return (
		<nav className="navigation">
			<ul className="navigation__list">
				{navigation}
				{/* TODO spróbować to ogarnąć aby korzystać normalnie z user/:id */}
				<li className="navigation__list__element-link">
					<NavLink
						to={`/user/${userIdPath}`}
						className="navigation__list__element-link"
					>
						Strona użytkownika
					</NavLink>
				</li>
			</ul>
		</nav>
	);
};

export default Navigation;
