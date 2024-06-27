import styles from "./AuthForms.module.css";

export default function Input({ label, id, error, ...props }) {
  return (
    <div className={styles.row}>
      <label htmlFor={id}>{label}</label>
      <input
        id={id}
        {...props}
        className={`${error ? styles.invalid : null}`}
      />
    </div>
  );
}
