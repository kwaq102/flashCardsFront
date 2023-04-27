import React from "react";

interface Props {
	wordsPerPage: number;
	totalWords: number;
	paginate: (pageNumber: number) => void;
}

const Pagination = ({ wordsPerPage, totalWords, paginate }: Props) => {
	const pageNumbers = [];

	for (let i = 1; i <= Math.ceil(totalWords / wordsPerPage); i++) {
		pageNumbers.push(i);
	}

	return (
		<nav>
			<ul>
				{pageNumbers.map(number => (
					<li key={number} onClick={() => paginate(number)}>
						{number}
					</li>
				))}
			</ul>
		</nav>
	);
};

export default Pagination;
