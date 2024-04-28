import styles from "./Auth.module.css";

export default function Input({ label, id, error, ...props }) {
  return (
    <div className={styles.row}>
      <label htmlFor={id}>{label}</label>
      <input id={id} {...props} />
      <div>{error && <p className={styles["error-msg"]}>{error}</p>}</div>
    </div>
  );
}
