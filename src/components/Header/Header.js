import styles from "./Header.module.css";
import { useContext } from "react";
import { TitleContext } from "../../store/title-context";

const Header = () => {
  const titleCtx = useContext(TitleContext);
  const userName = localStorage.getItem("userName");

  return (
    <header>
      <div id={styles["first-row"]}>
        <div className={styles["h-group"]}>
          <h1 id="title" data-testid="title">
            Simple Budget App
          </h1>
          <h2>
            Hello, <span id="username">{userName}</span>!
          </h2>
        </div>
      </div>
      <div id={styles["second-row"]}>
        <h3 id="pageTitle">{titleCtx.pageTitle}</h3>
      </div>
    </header>
  );
};

export default Header;
