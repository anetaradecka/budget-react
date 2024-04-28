// external libraries
import { Form } from "react-router-dom";
// styles
import styles from "./Auth.module.css";
import btnStyles from "../../Buttons/Button.module.css";
// components
import Input from "./Input";
import Button from "../../Buttons/Button";
//hooks
import { useInput } from "../../../hooks/useInput";
//utils
import {
  isValidEmail,
  isNotEmpty,
  isValidPassword,
  // isEqualToOtherValue,
} from "../../../utils/validation";

const SignupForm = () => {
  // custom name hook
  const {
    value: nameValue,
    handleInputValidation: handleNameChange,
    handleInputBlur: handleNameBlur,
    hasError: nameHasError,
  } = useInput("", isNotEmpty);
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
  } = useInput("", isValidPassword);
  // custom hook confirm password - How to pass both password and confirmPassword?
  // const {
  //   value: confirmPasswordValue,
  //   handleInputValidation: handleConfirmPasswordChange,
  //   handleInputBlur: handleConfirmPasswordBlur,
  //   hasError: confirmPasswordHasError,
  // } = useInput("", isEqualToOtherValue);

  return (
    <Form method="PUT" className={styles.form}>
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
      <Button
        className={`${btnStyles.button} ${btnStyles["btn-primary"]}`}
        type="submit"
      >
        Create account
      </Button>
    </Form>
  );
};

export default SignupForm;
