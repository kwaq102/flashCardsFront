import React from "react";
import { WordEntity } from "types";

interface Props {
	words: WordEntity[];
}

// TODO chyba zrobić tabelkę ze słówkami

const DisplayWords = ({ words }: Props) => {
	return (
		<section>
			<h2>Twój słownik</h2>
			{words.map((word, i) => (
				<div key={word.id}>
					<h3>
						{i + 1} {word.title}
					</h3>
					<p>{word.description}</p>
					<p>{word.notes}</p>
				</div>
			))}
		</section>
	);
};

export default DisplayWords;
