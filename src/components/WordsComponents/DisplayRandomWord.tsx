import React, { ChangeEvent, MouseEvent, useState } from "react";
import { MAIN_URL } from "../../utils/url";
import { WordEntity } from "types";
import CardWord from "./CardWord";

interface Props {
	words: WordEntity[];
	onWordsChange: () => void;
}

const DisplayRandomWord = ({ words, onWordsChange }: Props) => {
	const [numberWords, setNumberWords] = useState(1);
	const [drawnWords, setDrawnWords] = useState<WordEntity[]>([]);

	const options = () => {
		return words.map((word, i) => {
			if (i >= 20) return null;
			return (
				<option key={i + 1} value={i + 1}>
					{i + 1}
				</option>
			);
		});
	};

	const clearDisplayRadomWords = () => {
		setDrawnWords([]);
		setNumberWords(1);
		onWordsChange();
	};

	const randomWord = () => {
		setDrawnWords([]);

		const newArr: WordEntity[] = [];
		const fullArr = [...words];

		if (fullArr.length === 0) return;

		if (fullArr.length === 1) {
			setDrawnWords([...fullArr]);
			return;
		}

		for (let i = 0; i < numberWords; i++) {
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
		setNumberWords(Number(e.currentTarget.value));
	};
	const deleteWord = async (e: MouseEvent<HTMLButtonElement>) => {
		if (!window.confirm("Czy na pewno?")) return;

		const oldArrWords = [...drawnWords];

		const [wordToRemove] = words.filter(word => word.id === e.currentTarget.id);

		const newArrWords = oldArrWords.filter(word => word.id !== wordToRemove.id);

		const res = await fetch(`${MAIN_URL}/data/remove/${wordToRemove.id}`, {
			method: "DELETE",
		});

		if (res.status === 200 || res.status === 204) {
			console.log("weszło here");

			setDrawnWords([...newArrWords]);
			onWordsChange();
			setNumberWords(1);
			return (
				// TODO sprawdzić dlaczego to nie działą ???
				<section>
					<p>USINIĘTO</p>
				</section>
			);
		} else {
			console.error();
		}
	};

	return (
		<section className="drawWords">
			<h3 className="drawWords__headingH3">Przypominajka</h3>
			<p className="drawWords__text">
				Masz <strong>{words.length}</strong> zapisanych słówek.
			</p>

			<button onClick={randomWord} className="drawWords__drawButton btn">
				Losuj
			</button>
			<select
				name="words-number"
				className="drawWords__selectNumberToDisplay"
				onChange={handleSetNumberWords}
			>
				{options()}
			</select>
			<button
				onClick={clearDisplayRadomWords}
				className="drawWords__clearButton btn"
			>
				Wyczyść
			</button>
			<div className="drawWords__content">
				<p className="drawWords__text">Wylosowane: </p>
				{drawnWords.map(word => (
					<CardWord word={word} deleteWord={deleteWord} />
				))}
			</div>
		</section>
	);
};

export default DisplayRandomWord;
