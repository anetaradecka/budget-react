import { Link, Form, redirect, json, useActionData } from "react-router-dom";
import { useState } from "react";

import {
  isValidEmail,
  isNotEmpty,
  isValidPassword,
  isEqualToOtherValue,
} from "../../util/validation";
import styles from "./Auth.module.css";
import Input from "./Input";

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

  const nameIsInvalid = didEdit.name && !isNotEmpty(enteredValues.name);
  const emailIsInvalid = didEdit.email && !isValidEmail(enteredValues.email);
  const passwordIsInvalid =
    didEdit.password && !isValidPassword(enteredValues.password);
  const passwordsNotEqual =
    didEdit.confirmPassword &&
    !isEqualToOtherValue(enteredValues.password, enteredValues.confirmPassword);

  return (
    <div className={styles["form-container"]}>
      <div className={styles.wrapper}>
        {/* display BE errors */}
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
          <Input
            label="How would you like to be called?"
            id="name"
            type="text"
            name="name"
            onChange={(event) =>
              handleInputValidation("name", event.target.value)
            }
            value={enteredValues.name}
            onBlur={() => handleInputBlur("name")}
            error={nameIsInvalid && "Please enter your name."}
          />
          <Input
            label="Email address"
            id="email"
            type="email"
            name="email"
            onChange={(event) =>
              handleInputValidation("email", event.target.value)
            }
            value={enteredValues.email}
            onBlur={() => handleInputBlur("email")}
            error={emailIsInvalid && "This is not a valid email format."}
          />
          <Input
            label="Password"
            id="password"
            type="password"
            name="password"
            onChange={(event) =>
              handleInputValidation("password", event.target.value)
            }
            value={enteredValues.password}
            onBlur={() => handleInputBlur("password")}
            error={
              passwordIsInvalid &&
              "Password must be at least 5 characters long and must contain at least one A-Z, one a-z letter and one /1-9/ number."
            }
          />
          <Input
            label="Confirm password"
            id="confirmPassword"
            type="password"
            name="confirmPassword"
            onChange={(event) =>
              handleInputValidation("confirmPassword", event.target.value)
            }
            value={enteredValues.confirmPassword}
            onBlur={() => handleInputBlur("confirmPassword")}
            error={passwordsNotEqual && "Entered passwords must be equal."}
          />
          {/* <div className={styles.row}>
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
          </div> */}
          {/* <div className={styles.row}>
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
