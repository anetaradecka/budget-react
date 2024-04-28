// const LoginForm = (props) => {
//   <Form method="put">
//     <Input
//       label="How would you like to be called?"
//       id="name"
//       type="text"
//       name="name"
//       onChange={handleNameChange}
//       value={nameValue}
//       onBlur={handleNameBlur}
//       error={nameHasError && "Please enter your name."}
//     />
//     <Input
//       label="Email address"
//       id="email"
//       type="email"
//       name="email"
//       onChange={handleEmailChange}
//       value={emailValue}
//       onBlur={handleEmailBlur}
//       error={emailHasError && "This is not a valid email format."}
//     />
//     <Input
//       label="Password"
//       id="password"
//       type="password"
//       name="password"
//       onChange={handlePasswordChange}
//       value={passwordValue}
//       onBlur={handlePasswordBlur}
//       error={
//         passwordHasError &&
//         "Password must be at least 5 characters long and must contain at least one A-Z, one a-z letter and one /1-9/ number."
//       }
//     />
//     {/* TODO: confirm passoword logic */}
//     {/* <Input
//             label="Confirm password"
//             id="confirmPassword"
//             type="password"
//             name="confirmPassword"
//             onChange={handleConfirmPasswordChange}
//             value={confirmPasswordValue}
//             onBlur={handleConfirmPasswordBlur}
//             error={
//               confirmPasswordHasError && "Entered passwords must be equal."
//             }
//           /> */}
//     <div className={styles.row}>
//       <button className={styles.button} type="submit" value="Login">
//         Create account
//       </button>
//     </div>
//     <div className={styles["signup-link"]}>
//       Already a member? <Link to="/">Log in</Link>
//     </div>
//   </Form>;
// };
