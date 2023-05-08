import React from "react";
import ArrowPagination from "./ArrowPagination";

interface Props {
	wordsPerPage: number;
	totalWords: number;
	currentPage: number;
	paginate: (pageNumber: number) => void;
}

const Pagination = ({
	wordsPerPage,
	totalWords,
	currentPage,
	paginate,
}: Props) => {
	const pageNumbers = [];

	for (let i = 1; i <= Math.ceil(totalWords / wordsPerPage); i++) {
		pageNumbers.push(i);
	}

	console.log(pageNumbers);

	return (
		<div className="pagination">
			<ArrowPagination
				wordsPerPage={wordsPerPage}
				totalWords={totalWords}
				text="Prev"
				currentPage={currentPage}
				paginate={paginate}
			/>
			<nav className="pagination__navigation">
				<ul className="pagination__navigation__list">
					{pageNumbers.map(number => {
						const active = currentPage === number ? "active" : "";
						return (
							<li
								key={number}
								onClick={() => paginate(number)}
								className={`pagination__navigation__list__element`}
							>
								{/* TODO sprawdzić, czy wg dobrych praktyk, ten buttony nie powinny być anchorami */}
								<button
									className={`pagination__navigation__list__element__button pagination-btn ${active}`}
								>
									{number}
								</button>
							</li>
						);
					})}
				</ul>
			</nav>
			<ArrowPagination
				wordsPerPage={wordsPerPage}
				totalWords={totalWords}
				text="Next"
				currentPage={currentPage}
				paginate={paginate}
			/>
		</div>
	);
};

export default Pagination;
