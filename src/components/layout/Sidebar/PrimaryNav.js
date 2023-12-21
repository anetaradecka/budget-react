import NavItem from "./NavItem";
import styles from "./PrimaryNav.module.css";

const PrimaryNav = () => {
  return (
    <nav id={styles["primary-nav"]}>
      <ul>
        <NavItem pathTo="" linkName="dashboard"></NavItem>
        <NavItem pathTo="/transactions" linkName="transactions"></NavItem>
      </ul>
    </nav>
  );
};

export default PrimaryNav;
