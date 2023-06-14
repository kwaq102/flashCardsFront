import React, { MouseEvent } from "react";
import { WordEntity } from "types";

interface Props {
	word: WordEntity;
	deleteWord: (e: MouseEvent<HTMLButtonElement>) => void;
}

const CardWord = ({ word, deleteWord }: Props) => {
	return (
		<div key={word.id} className="drawWords__content-card">
			<h4 className="drawWords__content-headingH4">{word.title}</h4>
			<p className="drawWords__content-description text">{word.description}</p>
			<p className="drawWords__content-notes text">
				<span>Notatki: </span>
				{word.notes}
			</p>
			<button
				id={word.id}
				onClick={deleteWord}
				className="drawWords__deleteButton btn"
			>
				Usuń
			</button>
		</div>
	);
};

export default CardWord;
