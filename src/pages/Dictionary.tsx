import { useContext, useEffect } from "react";
import { MAIN_URL } from "../utils/url";
import { LoggedContext } from "../App";
import AddWord from "./AddWord";

const Dictionary = () => {
	const context = useContext(LoggedContext);

	const { user } = context;

	useEffect(() => {
		(async () => {
			const res = await fetch(`${MAIN_URL}/data/search/${user?.id}`);
			const data = await res.json();

			console.log(data);
		})();
	}, []);

	return (
		<>
			<h2>słownik</h2>

			<AddWord />
		</>
	);
};

export default Dictionary;
