import React, { createContext, useEffect, useState } from "react";
import { Route } from "react-router";
import { Routes, Navigate } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import UserPage from "./pages/UserPage";
import { UserEntity } from "types";
import HomePage from "./pages/HomePage";
import ErrorPage from "./pages/ErrorPage";
import AddWord from "./components/WordsComponents/AddWord";
import DisplayWords from "./components/WordsComponents/DisplayWords";
import Banner from "./components/Banner";
import { MAIN_URL } from "./utils/url";
import { WordEntity } from "types";
import Footer from "./components/Footer";
import FadeLoader from "react-spinners/FadeLoader";
import { override } from "./utils/loadingStyle";

import "./styles/index.scss";

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
	const checkUser = () => {
		if (localStorage.getItem("user") !== null) {
			const user = localStorage.getItem("user");
			if (user === null) return;
			return JSON.parse(user);
		} else return null;
	};

	const [logged, setLogged] = useState(() => {
		if (localStorage.getItem("logged") === "true") {
			return true;
		} else return false;
	});
	const [user, setUser] = useState<UserEntity | null>(checkUser);
	console.log(user);

	const [words, setWords] = useState<WordEntity[]>([]);
	const [showNav, setShowNav] = useState(false);
	const [loading, setLoading] = useState(false);

	const handleLogIn = () => {
		setLoading(true);
		setLogged(true);
		localStorage.setItem("logged", String(true));
		setLoading(false);
	};
	const handleLogOut = () => {
		setLogged(false);
		setUser(null);
		localStorage.removeItem("logged");
		localStorage.removeItem("user");
	};

	const refreshWords = async () => {
		if (user === null) return null;
		setLoading(true);
		setWords([]);

		const res = await fetch(`${MAIN_URL}/data/search/${user.id}`);
		const data = await res.json();
		setWords(data);
		setLoading(false);
	};

	useEffect(() => {
		refreshWords();
	}, [logged]);

	const hideNav = (e: any) => {
		if (showNav) {
			if (!e.target.className.includes("navigation__list")) {
				setShowNav(false);
			}
		}
	};

	return (
		<div className="App" onClick={hideNav}>
			<Banner
				logged={logged}
				handleLogOut={handleLogOut}
				user={user}
				showNav={showNav}
				setShowNav={setShowNav}
			/>
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
							) : loading ? (
								<FadeLoader
									speedMultiplier={0.8}
									height={25}
									cssOverride={override}
									color="#464c5a"
								/>
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
						element={
							<DisplayWords
								words={words}
								onWordsChange={refreshWords}
								loading={loading}
							/>
						}
					/>
					<Route path="*" element={<ErrorPage />} />
				</Routes>
			</LoggedContext.Provider>
			<Footer />
		</div>
	);
}

export default App;
