import React, { useState } from "react";
import { WordEntity } from "types";

interface Props {
	words: WordEntity[];
}

const DisplayRandomWord = ({ words }: Props) => {
	const [index, setIndex] = useState<number | null>(null);

	const randomWord = () => {
		console.log("działa");

		const i = Math.floor(Math.random() * words.length);

		console.log(i);
		setIndex(i);
	};

	console.log();

	return (
		<section>
			<h3>Powtórka</h3>
			<p>wyolsuj</p>
			<p>długość tablicy words to: {words.length}</p>

			<button onClick={randomWord}>Wylosuj słówko</button>
			<div>
				Twoje słowo to:{" "}
				{index !== null && (
					<div>
						<h3>{words[index].title}</h3>
						<p>{words[index].description}</p>
						<p>{words[index].notes}</p>
					</div>
				)}
			</div>
		</section>
	);
};

export default DisplayRandomWord;
