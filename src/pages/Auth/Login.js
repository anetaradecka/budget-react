import { Link, Form, redirect, json, useActionData } from "react-router-dom";
import { useInput } from "../../hooks/useInput";
import { isValidEmail, isNotEmpty } from "../../util/validation";
import { getCSRFToken } from "../../util/auth";
import styles from "./Auth.module.css";
import Input from "./Input";

const Login = () => {
  const errors = useActionData();
  // custom hook email
  const {
    value: emailValue,
    handleInputValidation: handleEmailChange,
    handleInputBlur: handleEmailBlur,
    hasError: emailHasError,
  } = useInput("", isValidEmail);
  // custom hook password
  const {
    value: passwordValue,
    handleInputValidation: handlePasswordChange,
    handleInputBlur: handlePasswordBlur,
    hasError: passwordHasError,
  } = useInput("", isNotEmpty);

  return (
    <div className={styles["form-container"]}>
      {/* displays BE errors */}
      {errors && errors.message && (
        <div className={`${styles["error-msg"]} ${styles["form-outside"]}`}>
          <p>{errors.message}</p>
        </div>
      )}

      <div className={styles.wrapper}>
        <div className={styles.title}>
          <span>Welcome!</span>
        </div>
        <Form method="POST" className={styles.form}>
          <Input
            label="Email address"
            id="email"
            type="email"
            name="email"
            onChange={handleEmailChange}
            value={emailValue}
            onBlur={handleEmailBlur}
            error={emailHasError && "This is not a valid email address."}
          />
          <Input
            label="Password"
            id="password"
            type="password"
            name="password"
            onChange={handlePasswordChange}
            value={passwordValue}
            onBlur={handlePasswordBlur}
            error={passwordHasError && "Password cannot be empty."}
          />
          <div className={styles.pass}>
            <a href="/reset-password">Forgot password?</a>
          </div>
          <div className={styles.row}>
            <button
              id="login-btn"
              className={`${styles.button} ${styles["btn-primary"]}`}
              type="submit"
              value="Login"
            >
              Log in
            </button>
          </div>
          <div className={styles["signup-link"]}>
            Not a member yet? <Link to="/signup">Sign up</Link>
          </div>
        </Form>
      </div>
    </div>
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
