import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { LoggedContext } from "../App";

const HomePage = () => {
	const context = useContext(LoggedContext);
	const { logged } = context;

	return (
		<div className="homePage__content">
			<h2 className="homePage__heading heading-h2">Witaj!</h2>
			<p className="homePage__welcome-text">
				Witam Cię na stronie głównej aplikacji zaliczeniowej kursu MekaK.
			</p>

			{!logged && (
				<div className="homePage__wrapperButtons">
					<Link to="/register" className="homePage__button btn">
						Zarejestruj
					</Link>
					<Link to="/login" className="homePage__button btn">
						Zaloguj
					</Link>
				</div>
			)}
			<p className="homePage__descriptiont">
				Aplikacja ma na celu pomóc w nauce języka angielskiego, a dokładnie
				powtarzaniu i zapamiętywaniu słówek. Aplikacja o roboczej nazwie
				"Dictionary" umożliwia notowanie poznanych słówek, wraz ze znaczeniem i
				opisem ich do pamięci, a następnie odtwarznie, czytanie i powtarzanie...
			</p>
			<p className="homePage__descriptiont">
				Przykładowe praktyczne zastosowanie aplikacji polega na tym, że podczas
				lekcji, jakiejś sesji itp. uczymy się nowych angielskich (lub innych)
				słów, ale od razu ich nie zapamiętujemy. Możemy je zapisać w aplikacji,
				dodać jakiś opis, skojarzenia związane z danym słówkiem, a nastepnie w
				wolnych chwilach np. w komunikacji, w kolejce do lekarza, szybko na
				urządzeniu mobilnym powtarzać, uczyć się tych słówek. Dzięki temu nie
				musimy nosić ze sobą notatek, tradycyjnego słownika i istnieje szansa
				szybszego i lepszego zapamiętywania i ubogacenia słownictwa.
			</p>
		</div>
	);
};

export default HomePage;
