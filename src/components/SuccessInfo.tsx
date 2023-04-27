import React from "react";

interface Props {
	text: string;
}

const SuccessInfo = ({ text }: Props) => {
	return <p className="success-text">{text}</p>;
};

export default SuccessInfo;
