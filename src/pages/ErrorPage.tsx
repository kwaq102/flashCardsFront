import { Link } from "react-router-dom";

const ErrorPage = () => {
	return (
		<>
			<p>Ups... coś poszło nie tak</p>
			<Link to="/">Wróć do strony głównej</Link>
		</>
	);
};

export default ErrorPage;
