import React from "react";
import { WordEntity } from "types";

interface Props {
	words: WordEntity[];
}

const DisplayWords = ({ words }: Props) => {
	const allWords = words
		.sort((prev, curr) => {
			if (prev.title.toUpperCase() < curr.title.toUpperCase()) {
				return -1;
			} else if (prev.title.toUpperCase() > curr.title.toUpperCase()) {
				return 1;
			} else {
				return 0;
			}
		})
		.map((word, i) => (
			<tr key={word.id} className="displayAllWords__table__body__row">
				<th className="displayAllWords__table__body__element ordinal-number">
					{i + 1}
				</th>
				<th className="displayAllWords__table__body__element"> {word.title}</th>
				<th className="displayAllWords__table__body__element">
					{word.description}
				</th>
				<th className="displayAllWords__table__body__element">{word.notes}</th>
			</tr>
		));
	return (
		<section className="displayAllWords">
			<h2 className="displayAllWords__heading headingH3">Twój słownik</h2>

			<table className="displayAllWords__table">
				<thead className="displayAllWords__table__heading">
					<tr className="displayAllWords__table__heading__row">
						<th className="displayAllWords__table__heading__element ordinal-number-head">
							L.p.
						</th>
						<th className="displayAllWords__table__heading__element">Tytuł</th>
						<th className="displayAllWords__table__heading__element">
							Znaczenie
						</th>
						<th className="displayAllWords__table__heading__element">
							Notatki
						</th>
					</tr>
				</thead>
				<tbody className="displayAllWords__table__body">{allWords}</tbody>
			</table>
		</section>
	);
};

export default DisplayWords;
