import { Link } from "react-router-dom";

function LandingPage() {
  return (
    <>
      <h1>Landing Page</h1>
      <Link to="/login">Login </Link>
      <Link to="/signup"> Signup</Link>
    </>
  );
}

export default LandingPage;
