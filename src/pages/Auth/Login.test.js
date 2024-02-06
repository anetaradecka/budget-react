import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
// import Login from "./Login";
import App from "../../App";

describe("login suite", () => {
  test("contains a link to signup page", () => {
    render(<App></App>);
    const linkElement = screen.getByText("Sign up");
    expect(linkElement).toBeInTheDocument();
  });

  test("Clicks on the link to signup page", () => {
    render(<App></App>);

    const expectedPath = "signup";
    const linkElement = screen.getByTestId("auth-link");
    userEvent.click(linkElement);

    expect(screen.getByTestId("location-display")).toHaveTextContent(
      expectedPath
    );
  });

  test("Displays invalid email message when email input is empty", () => {
    render(<App></App>);

    const emailInput = screen.queryByTestId("email");
    const formElement = screen.queryByTestId("form");

    userEvent.click(emailInput);
    userEvent.click(formElement);

    expect(screen.queryByTestId("error-msg")).toHaveTextContent(
      "This is not a valid email address."
    );
  });
});
