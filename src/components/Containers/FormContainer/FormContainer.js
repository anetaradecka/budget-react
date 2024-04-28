// styles
import styles from "./FormContainer.module.css";

const FormContainer = ({ children, ...props }) => {
  return (
    <div className={styles["form-container"]}>
      <h1>{props.title}</h1>
      {children}
    </div>
  );
};

export default FormContainer;
