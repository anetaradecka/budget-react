import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import styles from "./Auth.module.css";

const Login = () => {
  const [enteredEmail, setEmail] = useState();
  const [enteredPassword, setPassword] = useState();
  const navigate = useNavigate();

  const emailInputChangeHandler = (event) => {
    //resetErrorMsg(event);
    setEmail(event.target.value);
  };

  const passwordInputChangeHandler = (event) => {
    //resetErrorMsg(event);
    setPassword(event.target.value);
  };

  function navigateHandler() {
    navigate("/transactions");
  }

  const submitHandler = (event) => {
    event.preventDefault();
    fetch("http://localhost:8080/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: enteredEmail,
        password: enteredPassword,
      }),
    })
      .then((res) => {
        if (res.status === 422) {
          throw new Error("Validation failed. Check login data.");
        }
        if (res.status !== 200 && res.status !== 201) {
          console.log("Error!");
          throw new Error("Logging a user failed!");
        }
        return res.json();
      })
      .then((resData) => {
        console.log(resData);
        navigateHandler();
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
          <span>Welcome!</span>
        </div>
        <form className={styles.form} onSubmit={submitHandler}>
          <div className={styles.row}>
            <label for="email" placeholder="Email Adress">
              Email Address
            </label>
            <input
              className="<%= validationErrors.find(e => e.param === 'email') ? 'invalid' : ''%>"
              type="email"
              name="email"
              id="email"
              onChange={emailInputChangeHandler}
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
              onChange={passwordInputChangeHandler}
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
        </form>
      </div>
    </div>
  );
};

export default Login;
