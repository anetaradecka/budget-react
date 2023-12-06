import { Link, Form, redirect, json, useActionData } from "react-router-dom";
import { useState } from "react";
import validator from "validator";

import styles from "./Auth.module.css";

const Signup = () => {
  // returns data in case of 422 or 401
  const data = useActionData();

  // FE input fields validation
  const [enteredValues, setEnteredValues] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [didEdit, setDidEdit] = useState({
    name: false,
    email: false,
    password: false,
    confirmPassword: false,
  });

  function handleInputValidation(identifier, value) {
    setEnteredValues((previousValues) => ({
      ...previousValues,
      // sets the field to be modified dynamically
      [identifier]: value,
    }));

    setDidEdit((previousValues) => ({
      ...previousValues,
      [identifier]: false,
    }));
  }

  function handleInputBlur(identifier) {
    setDidEdit((previousState) => ({
      ...previousState,
      [identifier]: true,
    }));
  }

  function passwordValidation(password) {
    const lowerCase = /[a-z]/g;
    const upperCase = /[A-Z]/g;
    const numbers = /[0-9]/g;

    if (
      password.match(lowerCase) &&
      password.match(upperCase) &&
      password.match(numbers) &&
      password.length >= 5
    ) {
      return true;
    } else {
      return false;
    }
  }

  const nameIsInvalid = didEdit.name && enteredValues.name === "";
  const emailIsInvalid =
    didEdit.email && validator.isEmail(enteredValues.email) === false;
  const passwordIsInvalid =
    didEdit.password && passwordValidation(enteredValues.password) === false;
  const passwordsNotEqual =
    didEdit.confirmPassword &&
    enteredValues.password !== enteredValues.confirmPassword;

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
            <label htmlFor="name">How would you like to be called?</label>
            <input
              type="text"
              name="name"
              id="name"
              onChange={(event) =>
                handleInputValidation("name", event.target.value)
              }
              value={enteredValues.name}
              onBlur={() => handleInputBlur("name")}
            />
            <div>
              {nameIsInvalid && (
                <p className={styles["error-msg"]}>Please enter your name.</p>
              )}
            </div>
          </div>
          <div className={styles.row}>
            <label htmlFor="email">Email Address</label>
            <input
              type="email"
              name="email"
              id="email"
              onChange={(event) =>
                handleInputValidation("email", event.target.value)
              }
              value={enteredValues.email}
              onBlur={() => handleInputBlur("email")}
            />
            {emailIsInvalid && (
              <p className={styles["error-msg"]}>
                This is not a valid email format.
              </p>
            )}
          </div>
          <div className={styles.row}>
            <label htmlFor="password">Password</label>
            <input
              type="password"
              name="password"
              id="password"
              onChange={(event) =>
                handleInputValidation("password", event.target.value)
              }
              value={enteredValues.password}
              onBlur={() => handleInputBlur("password")}
            />
            {passwordIsInvalid && (
              <p className={styles["error-msg"]}>
                Password must be at least 5 characters long and must contain at
                least one /A-Z/, one /a-z/ letter and at least one /1-9/ number.
              </p>
            )}
          </div>
          <div className={styles.row}>
            <label htmlFor="confirmPassword">Confirm password</label>
            <input
              type="password"
              name="confirmPassword"
              id="confirmPassword"
              onChange={(event) =>
                handleInputValidation("confirmPassword", event.target.value)
              }
              value={enteredValues.confirmPassword}
              onBlur={() => handleInputBlur("confirmPassword")}
            />
            {passwordsNotEqual && (
              <p className={styles["error-msg"]}>Passwords must be the same.</p>
            )}
          </div>

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
