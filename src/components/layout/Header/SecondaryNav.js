import React, { useState, useEffect, useRef } from "react";
import { Form } from "react-router-dom";
import styles from "./SecondaryNav.module.css";

let useClickOutside = (handler) => {
  let menuRef = useRef();

  useEffect(() => {
    let clickHandler = (event) => {
      if (!menuRef.current.contains(event.target)) {
        handler();
      }
    };

    document.addEventListener("mousedown", clickHandler);

    return () => {
      document.removeEventListener("mousedown", clickHandler);
    };
  });
  return menuRef;
};

const SecondaryNav = () => {
  const [dropdownToggled, toggleDropdown] = useState(false);

  const handleClick = () => {
    toggleDropdown(!dropdownToggled);
  };

  let menuRef = useClickOutside(() => {
    toggleDropdown(false);
  });

  return (
    <nav id={styles["secondary-nav"]} ref={menuRef}>
      <div
        className={
          dropdownToggled
            ? `${styles.hamburger} ${styles.active}`
            : styles.hamburger
        }
        onClick={handleClick}
      >
        <span className={styles.bar}></span>
        <span className={styles.bar}></span>
        <span className={styles.bar}></span>
      </div>
      <ul className={`${dropdownToggled ? styles.active : ""}`}>
        <li className={styles["nav-item"]}>
          <a href="/">settings</a>
        </li>
        <li className={styles["nav-item"]}>
          <Form className={styles.logout} action="/logout" method="POST">
            <button className={`${styles.btn} ${styles.logout}`} type="submit">
              logout
            </button>
          </Form>
        </li>
      </ul>
    </nav>
  );
};

export default SecondaryNav;
