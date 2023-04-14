import React from "react";

interface Props {
	errorMessage: string;
}

const ErrorMessage = ({ errorMessage }: Props) => {
	return <p className="errorMessage">{errorMessage}</p>;
};

export default ErrorMessage;
