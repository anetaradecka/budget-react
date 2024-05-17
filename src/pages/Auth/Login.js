// external libraries
import { redirect, json, useActionData } from "react-router-dom";
// components
import FormContainer from "../../components/Containers/FormContainer/FormContainer";
import LoginForm from "../../components/Forms/AuthForms/LoginForm";
import ErrorContainer from "../../components/Containers/ErrorContainer/ErrorContainer";
import Footer from "../../components/Forms/Footer/Footer";
// utils
import { getCSRFToken } from "../../utils/auth";

const Login = () => {
  const response = useActionData();

  return (
    <FormContainer title="Welcome!">
      {response && <ErrorContainer errorData={response}></ErrorContainer>}
      <LoginForm></LoginForm>
      <Footer type="login" linkTo="signup" linkText="Sign up"></Footer>
    </FormContainer>
  );
};

export default Login;

export async function action({ request }) {
  const csrfToken = getCSRFToken();
  const data = await request.formData();

  const response = await fetch("http://localhost:8080/auth/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-CSRF-Token": csrfToken,
    },
    body: JSON.stringify({
      email: data.get("email"),
      password: data.get("password"),
    }),
  });

  //show any errors occured while trying to auth the user and didn't get ok response from BE
  if (response.status === 422 || response.status === 401) {
    return response;
  }

  if (!response.ok) {
    throw json({ message: "Logging user failed." }, { status: 500 });
  }

  // before we redirect the user we must extract their user_id and token
  const resData = await response.json();

  localStorage.setItem("token", resData.token);
  localStorage.setItem("userName", resData.name);

  const expiration = new Date();
  expiration.setHours(expiration.getHours() + 1);
  localStorage.setItem("expiration", expiration.toISOString());

  return redirect("/app");
}
