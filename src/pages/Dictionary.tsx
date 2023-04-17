import { useContext, useEffect, useState } from "react";
import { MAIN_URL } from "../utils/url";
import { LoggedContext } from "../App";
import AddWord from "../components/WordsComponents/AddWord";
import DisplayWords from "../components/WordsComponents/DisplayWords";
import DisplayRandomWord from "../components/WordsComponents/DisplayRandomWord";
import { WordEntity } from "types";

const Dictionary = () => {
	const [words, setWords] = useState<WordEntity[]>([]);

	const context = useContext(LoggedContext);
	const { logged, user } = context;

	useEffect(() => {
		(async () => {
			if (user === null) return null;

			const res = await fetch(`${MAIN_URL}/data/search/${user.id}`);
			const data = await res.json();
			setWords(data);
		})();
	}, [words]);

	return (
		<>
			<DisplayRandomWord words={words} />
			{/* <DisplayWords words={words} /> */}
			<AddWord />
		</>
	);
};

export default Dictionary;
