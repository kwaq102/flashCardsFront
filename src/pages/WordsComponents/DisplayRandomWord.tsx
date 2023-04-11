import React, {
	ChangeEvent,
	HTMLAttributeAnchorTarget,
	HTMLAttributes,
	MouseEvent,
	SyntheticEvent,
	useState,
} from "react";
import { Link } from "react-router-dom";
import { MAIN_URL } from "../../utils/url";
import { WordEntity } from "types";

interface Props {
	words: WordEntity[];
}

const DisplayRandomWord = ({ words }: Props) => {
	const [numberWords, setNumberWords] = useState(1);
	const [drawnWords, setDrawnWords] = useState<WordEntity[]>([]);

	const clearDisplayRadomWords = () => setDrawnWords([]);

	const randomWord = () => {
		setDrawnWords([]);

		const newArr: WordEntity[] = [];
		const fullArr = [...words];

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
		setNumberWords(Number(e.target.value));
	};

	const deleteWord = async (e: MouseEvent<HTMLButtonElement>) => {
		if (!window.confirm("Czy na pewno?")) return;

		const oldArrWords = [...drawnWords];

		const [wordToRemove] = words.filter(word => word.id === e.currentTarget.id);
		console.log(oldArrWords);

		const newArrWords = oldArrWords.filter(word => word.id !== wordToRemove.id);

		console.log(newArrWords);

		const res = await fetch(`${MAIN_URL}/data/remove/${wordToRemove.id}`, {
			method: "DELETE",
		});

		if (res.status === 200) {
			setDrawnWords([...newArrWords]);

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
			<button onClick={clearDisplayRadomWords}>Wyczyść</button>
			<div>
				Wylosowane:{" "}
				{drawnWords.map((word, i) => (
					<div key={word.id}>
						<h3>
							{i + 1} {word.title}
						</h3>
						<p>{word.description}</p>
						<p>{word.notes}</p>
						<button id={word.id} onClick={deleteWord}>
							Usuń
						</button>
					</div>
				))}
			</div>
		</section>
	);
};

export default DisplayRandomWord;
