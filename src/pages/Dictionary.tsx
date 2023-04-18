import React, { Dispatch, SetStateAction } from "react";
import DisplayRandomWord from "../components/WordsComponents/DisplayRandomWord";
import { WordEntity } from "types";

interface Props {
	words: WordEntity[];
	handleWords: Dispatch<SetStateAction<WordEntity[]>>;
	onWordsChange: () => void;
}

const Dictionary = ({ words, handleWords, onWordsChange }: Props) => {
	return (
		<>
			<DisplayRandomWord
				words={words}
				handleWords={handleWords}
				onWordsChange={onWordsChange}
			/>
		</>
	);
};

export default Dictionary;
