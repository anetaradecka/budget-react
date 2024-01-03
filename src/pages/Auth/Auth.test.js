import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
// import Login from "./Login";
// import Signup from "./Signup";
import App from "../../App";

describe("authentication suite", () => {
  test("contains a link to signup page", () => {
    render(<App></App>);
    const linkElement = screen.getByText("Sign up");
    expect(linkElement).toBeInTheDocument();
  });

  test("contains a link to login page", () => {
    render(<App></App>);
    const linkElement = screen.getByText("Log in");
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
});
