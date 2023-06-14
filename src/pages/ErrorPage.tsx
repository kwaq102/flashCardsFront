import { Link } from "react-router-dom";

const ErrorPage = () => {
	return (
		<section className="errorPage">
			<p className="errorPage__text">Ups... coś poszło nie tak...</p>
			<Link to="/" className="errorPage__linkToHomePage">
				Wróć do strony głównej
			</Link>
		</section>
	);
};

export default ErrorPage;
