import styles from "./Header.module.css";
import SecondaryNav from "./SecondaryNav";
import { useContext } from "react";
import { TitleContext } from "../../../contex/title-context";

const Header = () => {
  const titleCtx = useContext(TitleContext);
  const userName = localStorage.getItem("userName");

  return (
    <header>
      <div id={styles["first-row"]}>
        <div className={styles["h-group"]}>
          <h1>Simple Budget App</h1>
          <h2>Hello, {userName}!</h2>
        </div>
        <SecondaryNav />
      </div>
      <div id={styles["second-row"]}>
        <h3>{titleCtx.pageTitle}</h3>
      </div>
    </header>
  );
};

export default Header;
