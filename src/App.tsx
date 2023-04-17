import React, { createContext, useState } from "react";
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

	// TODO ustawić logged na jakis stan w localstorage??
	console.log(logged);

	const handleLogIn = () => {
		setLogged(true);
	};
	const handleLogOut = () => {
		setLogged(false);
	};

	const [user, setUser] = useState<UserEntity | null>(null);

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
							!logged ? <Navigate replace to="../../login" /> : <UserPage />
						}
					/>
					<Route path="*" element={<ErrorPage />} />
				</Routes>
			</LoggedContext.Provider>
		</div>
	);
}

export default App;
