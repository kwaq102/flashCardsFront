import React, { MouseEvent } from "react";
import { WordEntity } from "types";

interface Props {
	word: WordEntity;
	i: number;
	editWordOn: (e: MouseEvent) => void;
	removeWord: (e: MouseEvent<HTMLButtonElement>) => void;
}

const RowTable = ({ word, i, editWordOn, removeWord }: Props) => {
	return (
		<tr
			key={word.id}
			className="displayAllWords__table__body__row"
			data-index={i + 1}
		>
			<th className="displayAllWords__table__body__element ordinal-number">
				{i + 1}
			</th>
			<th className="displayAllWords__table__body__element">{word.title}</th>
			<th className="displayAllWords__table__body__element">
				{word.description}
			</th>
			<th className="displayAllWords__table__body__element">{word.notes}</th>
			<th className="displayAllWords__table__body__element actions">
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
			</th>
		</tr>
	);
};

export default RowTable;
