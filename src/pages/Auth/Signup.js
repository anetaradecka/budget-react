import { Link, Form, redirect, json, useActionData } from "react-router-dom";

import styles from "./Auth.module.css";

const Signup = () => {

  // returns data in case of 422 or 401
  const data = useActionData();

  return (
    <div className={styles["form-container"]}>
      <div className={styles.wrapper}>
        <div className={styles["error-msg"]}>
          {data && data.data && (
            <ul>
              {data.data.map((err) => (
                <li key={err.msg}>{err.msg}</li>
              ))}
            </ul>
          )}
        </div>
        <div className={styles.title}>
          <span>Get started for free</span>
        </div>
        <Form method="put">
          <div className={styles.row}>
            <label htmlFor="name">How you would like to be called?</label>
            <input
              type="text"
              name="name"
              id="name"
            />
          </div>
          <div className={styles.row}>
            <label htmlFor="email">Email Address</label>
            <input type="email" name="email" id="email" />
          </div>
          <div className={styles.row}>
            <label htmlFor="password">Password</label>
            <input type="password" name="password" id="password" />
          </div>
          {/* <div className={styles.row}>
            <label htmlFor="confirmPassword">Confirm password</label>
            <input
              className="<%= validationErrors.find(e => e.param === 'confirmPassword') ? 'invalid' : ''%>"
              type="password"
              name="confirmPassword"
              id="confirmPassword"
            />
          </div> */}
          <div className={styles.row}>
            {/* <input type="hidden" name="_csrf" value="<%= csrfToken %>" /> */}
            <button className={styles.button} type="submit" value="Login">
              Create account
            </button>
          </div>
          <div className={styles["signup-link"]}>
            Already a member? <Link to="/login">Log in</Link>
          </div>
          <Link to="/">Go back</Link>
        </Form>
      </div>
    </div>
  );
};

export default Signup;

export async function action({ request }) {
  const data = await request.formData();

  const response = await fetch("http://localhost:8080/auth/signup", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
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

  return redirect("/login");
}
