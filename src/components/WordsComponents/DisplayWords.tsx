import React, { useEffect, useState } from "react";
import { WordEntity } from "types";
import TopArrow from "../TopArrow";
import Table from "./Table";

interface Props {
	words: WordEntity[];
	onWordsChange: () => void;
	loading: boolean;
}

const DisplayWords = ({ words, onWordsChange, loading }: Props) => {
	const [isArrow, setIsArrow] = useState(false);

	useEffect(() => {
		window.addEventListener("scroll", showArrow);

		return () => {
			window.removeEventListener("scroll", showArrow);
		};
	}, []);

	const showArrow = () => {
		if (window.pageYOffset >= 250) {
			setIsArrow(true);
		} else {
			setIsArrow(false);
		}
	};

	return (
		<section className="displayAllWords">
			<h2 className="displayAllWords__heading headingH3">Twój słownik</h2>
			<Table words={words} onWordsChange={onWordsChange} loading={loading} />
			{isArrow && <TopArrow />}
		</section>
	);
};

export default DisplayWords;
