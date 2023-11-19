import { useState } from "react";
import { Link, Form } from "react-router-dom";

import styles from "./Auth.module.css";

const Signup = () => {
  const [enteredEmail, setEmail] = useState();
  const [enteredName, setName] = useState();
  const [enteredPassword, setPassword] = useState();

  const nameInputChangeHandler = (event) => {
    //resetErrorMsg(event);
    setName(event.target.value);
  };

  const emailInputChangeHandler = (event) => {
    //resetErrorMsg(event);
    setEmail(event.target.value);
  };

  const passwordInputChangeHandler = (event) => {
    //resetErrorMsg(event);
    setPassword(event.target.value);
  };

  const submitHandler = (event) => {
    event.preventDefault();
    fetch("http://localhost:8080/signup", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: enteredName,
        email: enteredEmail,
        password: enteredPassword,
      }),
    })
      .then((res) => {
        if (res.status === 422) {
          throw new Error(
            "Validation failed. Make sure the email address isn't used yet!"
          );
        }
        if (res.status !== 200 && res.status !== 201) {
          console.log("Error!");
          throw new Error("Creating a user failed!");
        }
        return res.json();
      })
      .then((resData) => {
        console.log(resData);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className={styles["form-container"]}>
      <div className={styles.wrapper}>
        <div className={styles["error-msg"]}></div>

        <div className={styles.title}>
          <span>Get started for free</span>
        </div>
        <Form onSubmit={submitHandler}>
          <div className={styles.row}>
            <label htmlFor="name">How you would like to be called?</label>
            <input
              type="text"
              name="name"
              id="name"
              onChange={nameInputChangeHandler}
            />
          </div>
          <div className={styles.row}>
            <label htmlFor="email">Email Address</label>
            <input
              className="<%= validationErrors.find(e => e.param === 'email') ? 'invalid' : ''%>"
              type="email"
              name="email"
              id="email"
              onChange={emailInputChangeHandler}
            />
          </div>
          <div className={styles.row}>
            <label htmlFor="password">Password</label>
            <input
              className="<%= validationErrors.find(e => e.param === 'password') ? 'invalid' : ''%>"
              type="password"
              name="password"
              id="password"
              onChange={passwordInputChangeHandler}
            />
          </div>
          <div className={styles.row}>
            <label htmlFor="confirmPassword">Confirm password</label>
            <input
              className="<%= validationErrors.find(e => e.param === 'confirmPassword') ? 'invalid' : ''%>"
              type="password"
              name="confirmPassword"
              id="confirmPassword"
            />
          </div>
          <div className={styles.row}>
            <input type="hidden" name="_csrf" value="<%= csrfToken %>" />
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
