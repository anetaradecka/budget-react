import styles from "./UserProfile.module.css";

const UserProfile = () => {
  return (
    <div className={styles["user-profile"]}>
      <div className={styles["user-avatar"]}>
        <img id={styles.avatar} src="/default.jpg" alt="user profile" />
      </div>
    </div>
  );
};

export default UserProfile;
