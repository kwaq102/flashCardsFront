import React from "react";

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
	console.log(currentPage);

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

	return <button onClick={handleCurrentPage}>{text}</button>;
};

export default ArrowPagination;
