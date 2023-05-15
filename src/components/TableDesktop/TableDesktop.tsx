import React, { MouseEvent } from "react";
import { WordEntity } from "types";
import RowTable from "../WordsComponents/RowTable";

interface Props {
	words: WordEntity[];
	editWordOn: (e: MouseEvent) => void;
	removeWord: (e: MouseEvent<HTMLButtonElement>) => void;
	indexOfFirstWord: number;
	indexOfLastWord: number;
}
const TableDesktop = ({
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
			<RowTable
				key={word.id}
				word={word}
				i={i}
				editWordOn={editWordOn}
				removeWord={removeWord}
			/>
		));
	return (
		<table className="displayAllWords__table">
			<thead className="displayAllWords__table__heading">
				<tr className="displayAllWords__table__heading__row">
					<th className="displayAllWords__table__heading__element ordinal-number-head">
						L.p.
					</th>
					<th className="displayAllWords__table__heading__element title">
						Tytuł
					</th>
					<th className="displayAllWords__table__heading__element">
						Znaczenie
					</th>
					<th className="displayAllWords__table__heading__element">Notatki</th>
				</tr>
			</thead>
			<tbody className="displayAllWords__table__body">
				{allWords.slice(indexOfFirstWord, indexOfLastWord)}
			</tbody>
		</table>
	);
};

export default TableDesktop;
