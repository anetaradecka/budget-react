import styles from "./Sidebar.module.css";

import UserProfile from "../User/UserProfile";
import PrimaryNav from "../Navigation/PrimaryNavigation/PrimaryNav";

const Sidebar = () => {
  return (
    <section id={styles.sidebar}>
      <UserProfile />
      <PrimaryNav />
    </section>
  );
};

export default Sidebar;
