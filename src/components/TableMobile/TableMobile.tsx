import React, { MouseEvent } from "react";
import { WordEntity } from "types";

interface Props {
	words: WordEntity[];
	editWordOn: (e: MouseEvent) => void;
	removeWord: (e: MouseEvent<HTMLButtonElement>) => void;
	indexOfFirstWord: number;
	indexOfLastWord: number;
}

const TableMobile = ({
	words,
	editWordOn,
	removeWord,
	indexOfFirstWord,
	indexOfLastWord,
}: Props) => {
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
			<tr key={word.id} className="displayAllWords__table-mobile__row">
				<th className="displayAllWords__table-mobile__heading__element title">
					{word.title}
				</th>
				<td className="displayAllWords__table-mobile__cell description">
					{word.description}
				</td>
				<td className="displayAllWords__table-mobile__cell notes">
					{word.notes}
				</td>
				<td className="displayAllWords__table-mobile__cell action-btns">
					<button
						className="displayAllWords__table__body__element-edit btn"
						onClick={editWordOn}
						data-id={word.id}
						data-index={i + 1}
					>
						Edytuj
					</button>
					<button
						className="displayAllWords__table__body__element-delete btn"
						onClick={removeWord}
						data-id={word.id}
					>
						X
					</button>
				</td>
			</tr>
		));

	return (
		<>
			<table className="displayAllWords__table-mobile">
				<tbody className="displayAllWords__table-mobile__body">
					{allWords.slice(indexOfFirstWord, indexOfLastWord)}
				</tbody>
			</table>
		</>
	);
};

export default TableMobile;
