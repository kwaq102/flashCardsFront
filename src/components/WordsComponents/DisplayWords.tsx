import React, { MouseEvent } from "react";
import { MAIN_URL } from "../../utils/url";
import { WordEntity } from "types";

interface Props {
	words: WordEntity[];
	onWordsChange: () => void;
}

const DisplayWords = ({ words, onWordsChange }: Props) => {
	const removeWord = async (e: MouseEvent<HTMLButtonElement>) => {
		if (!window.confirm("Czy na pewno?")) return;

		const [wordToRemove] = words.filter(word => word.id === e.currentTarget.id);

		console.log(e.currentTarget.id);
		console.log(wordToRemove.id);

		const res = await fetch(`${MAIN_URL}/data/remove/${wordToRemove.id}`, {
			method: "DELETE",
		});

		if (res.status === 200 || res.status === 204) {
			onWordsChange();
		}
	};

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
				<th className="displayAllWords__table__body__element remove">
					<button
						className="displayAllWords__table__body__element-delete btn"
						onClick={removeWord}
						id={word.id}
					>
						X
					</button>
				</th>
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
