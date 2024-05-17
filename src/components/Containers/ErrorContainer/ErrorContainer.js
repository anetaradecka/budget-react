// styles
import styles from "./ErrorContainer.module.css";

const ErrorContainer = (props) => {
  return (
    <div className={`${styles["error-msg"]}`}>
      <ul>
        {props.errorData.data ? (
          <>
            {props.errorData.data.map((err) => (
              <li key={err.msg}>{err.msg}</li>
            ))}
          </>
        ) : (
          <li key={props.errorData.message}>{props.errorData.message}</li>
        )}
      </ul>
    </div>
  );
};

export default ErrorContainer;
