import styles from "./UserProfile.module.css";

const UserProfile = (props) => {
  return (
    <div className={styles["user-profile"]}>
      <div className={styles["user-avatar"]}>
        <img id={styles.avatar} src="/default2.jpg" alt="user profile" />
      </div>
    </div>
  );
};

export default UserProfile;
