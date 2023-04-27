import { Dispatch, SetStateAction, useContext } from "react";
import { LoggedContext } from "../App";
import { useNavigate } from "react-router-dom";
import LogOutButton from "./LogOutButton";
import { WordEntity } from "types";
import DisplayRandomWord from "../components/WordsComponents/DisplayRandomWord";

interface Props {
	words: WordEntity[];
	onWordsChange: () => void;
	handleWords: Dispatch<SetStateAction<WordEntity[]>>;
}

const UserPage = ({ words, handleWords, onWordsChange }: Props) => {
	const context = useContext(LoggedContext);
	const navigate = useNavigate();

	const { logged, handleLogIn, user } = context;

	return (
		<section className="userPage">
			{!logged ? (
				<p>Jesteś niezalogowany</p>
			) : (
				<>
					<h2 className="headingH2">Strona użytkownika</h2>
					<DisplayRandomWord
						words={words}
						handleWords={handleWords}
						onWordsChange={onWordsChange}
					/>
					<br />
					<br />
					<LogOutButton />
				</>
			)}
		</section>
	);
};

export default UserPage;
