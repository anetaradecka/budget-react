import { Link, Form, redirect, json, useActionData } from "react-router-dom";
import { useInput } from "../../hooks/useInput";

import {
  isValidEmail,
  isNotEmpty,
  isValidPassword,
  // isEqualToOtherValue,
} from "../../util/validation";
import styles from "./Auth.module.css";
import Input from "./Input";

const Signup = () => {
  // returns data in case of 422 or 401
  const data = useActionData();
  // custom hook name
  const {
    value: nameValue,
    handleInputValidation: handleNameChange,
    handleInputBlur: handleNameBlur,
    hasError: nameHasError,
  } = useInput("", isNotEmpty);
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
  } = useInput("", isValidPassword);
  // custom hook confirm password - How to pass both password and confirmPassword?
  // const {
  //   value: confirmPasswordValue,
  //   handleInputValidation: handleConfirmPasswordChange,
  //   handleInputBlur: handleConfirmPasswordBlur,
  //   hasError: confirmPasswordHasError,
  // } = useInput("", isEqualToOtherValue);

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
            onChange={handleNameChange}
            value={nameValue}
            onBlur={handleNameBlur}
            error={nameHasError && "Please enter your name."}
          />
          <Input
            label="Email address"
            id="email"
            type="email"
            name="email"
            onChange={handleEmailChange}
            value={emailValue}
            onBlur={handleEmailBlur}
            error={emailHasError && "This is not a valid email format."}
          />
          <Input
            label="Password"
            id="password"
            type="password"
            name="password"
            onChange={handlePasswordChange}
            value={passwordValue}
            onBlur={handlePasswordBlur}
            error={
              passwordHasError &&
              "Password must be at least 5 characters long and must contain at least one A-Z, one a-z letter and one /1-9/ number."
            }
          />
          {/* TODO: confirm passoword logic */}
          {/* <Input
            label="Confirm password"
            id="confirmPassword"
            type="password"
            name="confirmPassword"
            onChange={handleConfirmPasswordChange}
            value={confirmPasswordValue}
            onBlur={handleConfirmPasswordBlur}
            error={
              confirmPasswordHasError && "Entered passwords must be equal."
            }
          /> */}
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
