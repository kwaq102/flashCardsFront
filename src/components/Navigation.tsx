import React from "react";
import { NavLink } from "react-router-dom";
import { navList } from "../utils/navigationList";

const Navigation = () => {
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
			<ul className="navigation__list">{navigation}</ul>
		</nav>
	);
};

export default Navigation;
