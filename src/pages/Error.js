import { useRouteError } from "react-router-dom";

function ErrorPage() {
  const error = useRouteError();

  let title = "An error occured.";
  let message = "Ops! Something went wrong!";

  if (error.status === 500) {
    message = JSON.parse(error.data).message;
  } else if (error.status === 404) {
    title = "Not found";
    message = "Could not find resource or page.";
  }

  return (
    <>
      <h1>{title}</h1>
      <p>{message}</p>
    </>
  );
}

export default ErrorPage;
