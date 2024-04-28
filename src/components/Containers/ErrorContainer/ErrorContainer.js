// styles
import styles from "./ErrorContainer.module.css";

const ErrorContainer = (props) => {
  return (
    <div className={`${styles["error-msg"]}`}>
      <ul>
        {props.data.data.map((err) => (
          <li key={err.msg}>{err.msg}</li>
        ))}
      </ul>
    </div>
  );
};

export default ErrorContainer;
