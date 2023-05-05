import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { navList } from "../utils/navigationList";
import { UserEntity } from "types";

import arrow from "../img/arrow-nav.svg";

interface Props {
	user: UserEntity | null;
}

const Navigation = ({ user }: Props) => {
	const [showNav, setShowNav] = useState(false);
	const userIdPath = user?.id ? user.id : "../login";

	const navigation = navList.map(el => (
		<li key={el.navName} className="navigation__list__element-link">
			<NavLink
				to={el.path}
				end={el.end}
				className="navigation__list__element-link"
				onClick={() => setShowNav(false)}
			>
				{el.navName}
			</NavLink>
		</li>
	));

	return (
		<nav className="navigation">
			<ul className={showNav ? "navigation__list show" : "navigation__list"}>
				{navigation}
				{/* TODO spróbować to ogarnąć aby korzystać normalnie z user/:id */}
				<li className="navigation__list__element-link">
					<NavLink
						to={`/user/${userIdPath}`}
						className="navigation__list__element-link"
						onClick={() => setShowNav(false)}
					>
						Strona użytkownika
					</NavLink>
				</li>
				{user !== null && (
					<>
						<li className="navigation__list__element-link">
							<NavLink
								to={`/user/${userIdPath}/add-word`}
								className="navigation__list__element-link"
								onClick={() => setShowNav(false)}
							>
								Dodaj słowo
							</NavLink>
						</li>
						<li className="navigation__list__element-link">
							<NavLink
								to={`/user/${userIdPath}/show-words`}
								className="navigation__list__element-link"
								onClick={() => setShowNav(false)}
							>
								Pokaż słownik
							</NavLink>
						</li>
					</>
				)}
			</ul>

			<div
				className={showNav ? "navigation__arrow" : "navigation__arrow show"}
				onClick={() => setShowNav(!showNav)}
			>
				<img
					src={arrow}
					alt="strzałka pokaż/ukryj menu"
					className="navigation__arrow-img"
				/>
			</div>
		</nav>
	);
};

export default Navigation;
