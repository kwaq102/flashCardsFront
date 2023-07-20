import { Dispatch, SetStateAction, useContext } from "react";
import { LoggedContext } from "../App";
import LogOutButton from "./LogOutButton";
import { WordEntity } from "types";
import DisplayRandomWord from "../components/WordsComponents/DisplayRandomWord";
import UserInfo from "../components/UserInfo";

interface Props {
	words: WordEntity[];
	onWordsChange: () => void;
	handleWords: Dispatch<SetStateAction<WordEntity[]>>;
}

const UserPage = ({ words, handleWords, onWordsChange }: Props) => {
	const context = useContext(LoggedContext);

	const { logged } = context;

	return (
		<section className="userPage page">
			{!logged ? (
				<p>Jesteś niezalogowany</p>
			) : (
				<>
					<h2 className="headingH2">Strona użytkownika</h2>
					<UserInfo />
					<DisplayRandomWord words={words} onWordsChange={onWordsChange} />
					<br />
					<br />
					<LogOutButton />
				</>
			)}
		</section>
	);
};

export default UserPage;
