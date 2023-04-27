import React from "react";

import arrow from "../img/arrow.svg";

const TopArrow = () => {
	const goToTop = () => {
		window.scrollTo({
			top: 0,
			behavior: "smooth",
		});
	};
	return (
		<div className="topArrow" onClick={goToTop}>
			<img src={arrow} className="topArrow__icon" alt="strzałka" />
		</div>
	);
};

export default TopArrow;
