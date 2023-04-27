import React, { useEffect, useState } from "react";

interface Props {
	wordsPerPage: number;
	totalWords: number;
	text: string;
	currentPage: number;
	paginate: (pageNumber: number) => void;
}

const ArrowPagination = ({
	text,
	currentPage,
	paginate,
	totalWords,
	wordsPerPage,
}: Props) => {
	const [borderRadius, setBorderRadius] = useState("");

	useEffect(() => {
		if (text === "Prev") {
			setBorderRadius("5px 0 0 5px");
		} else {
			setBorderRadius("0 5px 5px 0");
		}
	}, []);

	const handleCurrentPage = () => {
		switch (text) {
			case "Prev":
				if (currentPage === 1) return;
				paginate(currentPage - 1);
				break;
			case "Next":
				if (currentPage === Math.ceil(totalWords / wordsPerPage)) return;
				paginate(currentPage + 1);
				break;
			default:
				break;
		}
	};

	return (
		<button
			className="pagination__button pagination-btn"
			onClick={handleCurrentPage}
			style={{
				borderRadius,
			}}
		>
			{text}
		</button>
	);
};

export default ArrowPagination;
