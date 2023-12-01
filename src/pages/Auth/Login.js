import { Link, Form, redirect, json, useActionData } from "react-router-dom";

import styles from "./Auth.module.css";

const Login = () => {
  const errors = useActionData();

  return (
    <div className={styles["form-container"]}>
      <div className={styles.wrapper}>
        <div className={styles["error-msg"]}>
          {errors && errors.message && <p>{errors.message}</p>}
        </div>

        <div className={styles.title}>
          <span>Welcome!</span>
        </div>
        <Form method="POST" className={styles.form}>
          <div className={styles.row}>
            <label for="email" placeholder="Email Adress">
              Email Address
            </label>
            <input
              className="<%= validationErrors.find(e => e.param === 'email') ? 'invalid' : ''%>"
              type="email"
              name="email"
              id="email"
            />
          </div>
          <div className={styles.row}>
            <label for="email" placeholder="password">
              Password
            </label>
            <input
              className="<%= validationErrors.find(e => e.param === 'password') ? 'invalid' : ''%>"
              type="password"
              name="password"
              id="password"
            />
          </div>
          <div className={styles.pass}>
            <a href="/reset-password">Forgot password?</a>
          </div>
          <div className={styles.row}>
            <input type="hidden" name="_csrf" value="<%= csrfToken %>" />
            <button
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
          <Link to="/">Go back</Link>
        </Form>
      </div>
    </div>
  );
};

export default Login;

export async function action({ request }) {
  const data = await request.formData();

  const response = await fetch("http://localhost:8080/auth/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: data.get("email"),
      password: data.get("password"),
    }),
  });

  //show any errors occured while trying to auth the user
  if (response.status === 422 || response.status === 401) {
    return response;
  }

  if (!response.ok) {
    throw json({ message: "Logging user failed." }, { status: 500 });
  }

  // before we redirect the user we must extract their user_id and token
  const resData = await response.json();
  const token = resData.token;
  localStorage.setItem("token", token);
  const expiration = new Date();
  expiration.setHours(expiration.getHours() + 1);
  localStorage.setItem("expiration", expiration.toISOString());

  return redirect("/app");
}
