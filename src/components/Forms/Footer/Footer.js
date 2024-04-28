// external libraries
import { Link } from "react-router-dom";
// styles
import styles from "./Footer.module.css";

const Footer = (props) => {
  return (
    <section id={styles["form-footer"]}>
      <p>
        {props.type === "login" ? "Not a member yet? " : "Already a member? "}
        <Link to={`/${[props.linkTo]}`} className="primary">
          {props.linkText}
        </Link>
      </p>
    </section>
  );
};

export default Footer;
