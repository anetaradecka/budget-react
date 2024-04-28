// external libraries
import { redirect, json, useActionData } from "react-router-dom";
// styles
import styles from "./Auth.module.css";
// components
import SignupForm from "../../components/Forms/AuthForms/SignupForm";
import Footer from "../../components/Forms/Footer/Footer";
// utils
import { getCSRFToken } from "../../utils/auth";

const Signup = () => {
  const data = useActionData();

  return (
    <div className={styles["form-container"]}>
      {data && data.data && (
        <div className={`${styles["error-msg"]} ${styles["form-outside"]}`}>
          <ul>
            {data.data.map((err) => (
              <li key={err.msg}>{err.msg}</li>
            ))}
          </ul>
        </div>
      )}
      <h1>Get started for free</h1>
      <SignupForm></SignupForm>
      <Footer type="signup" linkTo="" linkText="Log in"></Footer>
    </div>
  );
};

export default Signup;

export async function action({ request }) {
  const csrfToken = getCSRFToken();
  const data = await request.formData();

  const response = await fetch("http://localhost:8080/auth/signup", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      "X-CSRF-Token": csrfToken,
    },
    body: JSON.stringify({
      name: data.get("name"),
      email: data.get("email"),
      password: data.get("password"),
    }),
  });

  //show any errors occured while trying to auth the user
  if (response.status === 422 || response.status === 401) {
    return response;
  }

  if (!response.ok) {
    throw json({ message: "Could not authenticate user." }, { status: 500 });
  }

  return redirect("/");
}
