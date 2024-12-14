import { useRouteError } from 'react-router-dom';

const ErrorPage = () => {
	const error = useRouteError();
	console.log(error);
	return (
		<div className="absolute text-center top-[50%] right-0 left-0">
			<h1>Oops!</h1>
			<p>Sorry, an unexpected error has occurred.</p>
			<p>
				<i>{error.statusText || error.message}</i>
			</p>
		</div>
	);
};

export default ErrorPage;
