// styles
import styles from "./FormContainer.module.css";

const FormContainer = ({ children, ...props }) => {
  return (
    <div className={styles["form-container"]}>
      <h2>{props.title}</h2>
      {children}
    </div>
  );
};

export default FormContainer;
