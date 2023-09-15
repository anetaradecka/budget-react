import styles from "./Header.module.css";

import SecondaryNav from './SecondaryNav'

const Header = (props) => {
  return (
    <header>
      <div id={styles['first-row']}>
        <div className={styles['h-group']}>
          <h1>Best Finance App</h1>
          <h2>Hello, John Doe!</h2>
        </div>
        <SecondaryNav />
      </div>
      <div id={styles['second-row']}>
        <h3>{props.pageTitle}</h3>
      </div>
    </header>
  );
};

export default Header;
