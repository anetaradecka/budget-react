import { NavLink } from "react-router-dom";

import styles from "./PrimaryNav.module.css";

const PrimaryNav = () => {
  return (
    <nav id={styles["primary-nav"]}>
      <ul>
        <li className={styles["nav-item"]}>
          <span className=""></span>
          <NavLink
            className={({ isActive }) => (isActive ? styles.active : undefined)}
            to="/app/dashboard"
          >
            dashboard
          </NavLink>
        </li>
        <li className={styles["nav-item"]}>
          <span className={styles.active}></span>
          <NavLink
            className={({ isActive }) => (isActive ? styles.active : undefined)}
            to="/app/transactions"
          >
            transactions
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default PrimaryNav;
