import styles from "./Sidebar.module.css";

import UserProfile from "./UserProfile";
import PrimaryNav from "./PrimaryNav";

const Sidebar = () => {
  return (
    <section id={styles.sidebar}>
      <UserProfile />
      <PrimaryNav />
    </section>
  );
};

export default Sidebar;
