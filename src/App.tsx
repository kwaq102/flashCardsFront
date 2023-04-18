import React, { createContext, useEffect, useState } from "react";
import { Route } from "react-router";
import { Routes, Navigate, Link } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import UserPage from "./pages/UserPage";
import { UserEntity } from "../../back/types/user";
import HomePage from "./pages/HomePage";
import ErrorPage from "./pages/ErrorPage";

import "./styles/index.scss";
import Navigation from "./components/Navigation";
import AddWord from "./components/WordsComponents/AddWord";
import DisplayWords from "./components/WordsComponents/DisplayWords";
import { MAIN_URL } from "./utils/url";
import { WordEntity } from "types";

interface LoggedContextType {
	logged: boolean;
	handleLogIn: () => void;
	handleLogOut: () => void;
	user: UserEntity | null;
	handleSetUser: (user: UserEntity) => void;
}

export const LoggedContext = createContext<LoggedContextType>({
	logged: false,
	handleLogIn: () => {},
	handleLogOut: () => {},
	user: null,
	handleSetUser: () => {},
});

function App() {
	const [logged, setLogged] = useState(false);
	const [user, setUser] = useState<UserEntity | null>(null);
	const [words, setWords] = useState<WordEntity[]>([]);

	// TODO ustawić logged na jakis stan w localstorage??
	console.log(logged);

	const handleLogIn = () => {
		setLogged(true);
	};
	const handleLogOut = () => {
		setLogged(false);
		setUser(null);
	};

	const refreshWords = async () => {
		if (user === null) return null;
		setWords([]);

		const res = await fetch(`${MAIN_URL}/data/search/${user.id}`);
		const data = await res.json();
		setWords(data);
	};

	useEffect(() => {
		refreshWords();
	}, [logged]);

	return (
		<div className="App">
			<div className="App__bannerTop">
				{logged ? (
					<Link to="/" className="App__bannerTop__btn" onClick={handleLogOut}>
						Wyloguj
					</Link>
				) : (
					<Link to="/login" className="App__bannerTop__btn">
						Zaloguj
					</Link>
				)}

				<Navigation user={user} />
			</div>
			<LoggedContext.Provider
				value={{
					logged,
					handleLogIn,
					handleLogOut,
					user,
					handleSetUser: setUser,
				}}
			>
				<Routes>
					<Route path="/" element={<HomePage />} />
					<Route path="/login" element={<LoginPage />} />
					<Route path="/register" element={<RegisterPage />} />

					<Route
						path={`/user/${user?.id}`}
						element={
							!logged ? (
								<Navigate replace to="../../login" />
							) : (
								<UserPage
									words={words}
									handleWords={setWords}
									onWordsChange={refreshWords}
								/>
							)
						}
					/>
					<Route
						path={`/user/${user?.id}/add-word`}
						element={<AddWord onWordsChange={refreshWords} />}
					/>
					<Route
						path={`/user/${user?.id}/show-words`}
						element={<DisplayWords words={words} />}
					/>
					<Route path="*" element={<ErrorPage />} />
				</Routes>
			</LoggedContext.Provider>
		</div>
	);
}

export default App;
