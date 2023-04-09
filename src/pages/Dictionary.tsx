import { useContext, useEffect, useState } from "react";
import { MAIN_URL } from "../utils/url";
import { LoggedContext } from "../App";
import AddWord from "./WordsComponents/AddWord";
import DisplayWords from "./WordsComponents/DisplayWords";
import DisplayRandomWord from "./WordsComponents/DisplayRandomWord";
import { WordEntity } from "types";

const Dictionary = () => {
	const [words, setWords] = useState<WordEntity[]>([]);

	const context = useContext(LoggedContext);
	const { logged, user } = context;

	console.log(words);

	useEffect(() => {
		(async () => {
			if (user === null) return null;

			const res = await fetch(`${MAIN_URL}/data/search/${user?.id}`);
			const data = await res.json();

			console.log(data);
			setWords(data);
		})();
	}, []);

	return (
		<>
			<DisplayRandomWord words={words} />
			{/* <DisplayWords words={words} /> */}
			<AddWord />
		</>
	);
};

export default Dictionary;