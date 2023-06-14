import React, { Dispatch, MouseEvent, SetStateAction } from "react";

import eye from "../img/eye.svg";
import eyeSlash from "../img/eye-slash.svg";

interface Props {
	displayPassword: boolean;
	setDisplayPassword: Dispatch<SetStateAction<boolean>>;
}
const EyePassword = ({ displayPassword, setDisplayPassword }: Props) => {
	const handleDisplayPassword = (e: MouseEvent) => {
		setDisplayPassword(!displayPassword);
	};

	return (
		<div
			className="registerPage__form-label__eye-wrapper"
			onClick={handleDisplayPassword}
		>
			{displayPassword ? (
				<img
					src={eye}
					className="registerPage__form-label__eye-icon eye"
					alt="ikona oka do ukazania hasła"
				/>
			) : (
				<img
					src={eyeSlash}
					className="registerPage__form-label__eye-icon eye-slash"
					alt="ikona przekreślonego oka w celu ukrycia hasła"
				/>
			)}
		</div>
	);
};

export default EyePassword;
