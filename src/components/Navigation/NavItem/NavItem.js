import { NavLink } from "react-router-dom";

import styles from "../PrimaryNavigation/PrimaryNav.module.css";

const NavItem = (props) => {
  return (
    <li className={styles["nav-item"]}>
      <NavLink
        to={"/app" + props.pathTo}
        className={({ isActive }) => (isActive ? styles.active : "")}
        children={({ isActive }) => {
          return (
            <>
              <span className={isActive ? styles.active : ""}></span>
              {props.linkName}
            </>
          );
        }}
        end
      ></NavLink>
    </li>
  );
};

export default NavItem;
