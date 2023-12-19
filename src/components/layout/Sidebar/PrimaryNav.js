import NavItem from "./NavItem";
import styles from "./PrimaryNav.module.css";

const PrimaryNav = () => {
  return (
    <nav id={styles["primary-nav"]}>
      <ul>
        <NavItem pathTo="dashboard" linkName="dashboard"></NavItem>
        <NavItem pathTo="transactions" linkName="dashboard"></NavItem>
      </ul>
    </nav>
  );
};

export default PrimaryNav;
