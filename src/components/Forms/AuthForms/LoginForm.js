// external libraries
import { Form, Link } from "react-router-dom";
// styles
import styles from "./Auth.module.css";
import btnStyles from "../../Buttons/Button.module.css";
// components
import Input from "./Input";
import Button from "../../Buttons/Button";
// hooks
import { useInput } from "../../../hooks/useInput";
//utils
import { isValidEmail, isNotEmpty } from "../../../utils/validation";

const LoginForm = () => {
  // custom email hook
  const {
    value: emailValue,
    handleInputValidation: handleEmailChange,
    handleInputBlur: handleEmailBlur,
    hasError: emailHasError,
  } = useInput("", isValidEmail);
  // custom password hook
  const {
    value: passwordValue,
    handleInputValidation: handlePasswordChange,
    handleInputBlur: handlePasswordBlur,
    hasError: passwordHasError,
  } = useInput("", isNotEmpty);

  return (
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
        error={passwordHasError && "Password field cannot be empty."}
      />
      <Link to="/reset-password" className="secondary">
        Forgot password?
      </Link>
      <Button
        className={`${btnStyles.button} ${btnStyles["btn-primary"]}`}
        type="submit"
      >
        Log in
      </Button>
    </Form>
  );
};

export default LoginForm;
