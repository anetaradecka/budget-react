import styles from "./PrimaryNav.module.css";

const PrimaryNav = () => {
  return (
    <nav id={styles['primary-nav']}>
      <ul>
        <li className={styles['nav-item']}>
        <span className=""></span>
        <a className="" href="/">
          dashboard
        </a>
      </li>
      <li className={styles['nav-item']}>
          <span className={styles.active}></span>
        <a className={styles.active} href="/">
          transactions
        </a>
      </li>
    </ul>
    </nav>
  );
};

export default PrimaryNav;
