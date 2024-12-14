import {useRouteError} from "react-router-dom";

const ErrorPage = () => {
  const error = useRouteError();
  console.error(error);
  return (
    <div className="text-center absolute top-1/2 right-0 left-0">
      <h1 className="text-4xl mb-4">Oops! 404 not found page</h1>
      <p>Sorry, an unexpected error has occurred.</p>
      <p>
        <i>{error.statusText || error.message}</i>
      </p>
    </div>
  );
};

export default ErrorPage;
