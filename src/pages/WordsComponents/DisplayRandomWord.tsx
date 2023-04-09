import React, { ChangeEvent, useState } from "react";
import { WordEntity } from "types";

interface Props {
	words: WordEntity[];
}

const DisplayRandomWord = ({ words }: Props) => {
	// const [index, setIndex] = useState<number | null>(null);
	const [numberWords, setNumberWords] = useState(1);
	const [drawnWords, setDrawnWords] = useState<WordEntity[]>([]);

	// const drawnWords: WordEntity[] = [];

	// const addUniqueWord = (newWordObj: WordEntity) => {
	// 	if (!drawnWords.some(object => object.id === newWordObj.id)) {
	// 		setDrawnWords([...drawnWords, newWordObj]);
	// 	}
	// };

	const randomWord = () => {
		setDrawnWords([]);

		const oldArr = [...drawnWords];
		const newArr: WordEntity[] = [];
		const fullArr = [...words];
		// console.log(newArr);
		// console.log(numberWords);

		for (let i = 0; i < numberWords; i++) {
			console.log(i);
			let index = Math.floor(Math.random() * words.length);

			if (!newArr.some(obj => obj.id === fullArr[index].id)) {
				newArr.push(fullArr[index]);
			} else {
				i = i - 1;
			}
		}

		setDrawnWords([...newArr]);
	};

	const handleSetNumberWords = (e: ChangeEvent<HTMLSelectElement>) => {
		setNumberWords(Number(e.target.value));
	};

	return (
		<section>
			<h3>Odmieć być</h3>
			<p>wyolsuj</p>
			<p>długość tablicy words to: {words.length}</p>

			<button onClick={randomWord}>Wylosuj</button>
			<select name="words-number" onChange={handleSetNumberWords}>
				{words.map((word, i) => (
					<option key={i + 1} value={i + 1}>
						{i + 1}
					</option>
				))}
			</select>
			<div>
				Wylosowane:{" "}
				{drawnWords.map((word, i) => (
					<div key={word.id}>
						<h3>
							{i + 1} {word.title}
						</h3>
						<p>{word.description}</p>
						<p>{word.notes}</p>
					</div>
				))}
			</div>
		</section>
	);
};

export default DisplayRandomWord;
