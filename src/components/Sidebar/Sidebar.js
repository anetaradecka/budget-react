import styles from "./Sidebar.module.css";

import UserProfile from "../User/UserProfile";
import PrimaryNav from "../Navigation/PrimaryNavigation/PrimaryNav";
import SecondaryNav from "../Navigation/SecondaryNavigation/SecondaryNav";

const Sidebar = () => {
  return (
    <section id={styles.sidebar}>
      <UserProfile />
      <PrimaryNav />
      <SecondaryNav />
    </section>
  );
};

export default Sidebar;
