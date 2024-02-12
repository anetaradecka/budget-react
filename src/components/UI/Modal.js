import { createPortal } from "react-dom";
import styles from "./Modal.module.css";

const Modal = (props) => {
  return createPortal(
    <div className={styles.modal}>
      <div className={styles.overlay}></div>
      <div className={styles.content}>
        <div className={styles["close-btn"]}>&times;</div>
        <h1>New transaction</h1>
        {props.children}
      </div>
    </div>,
    document.getElementById("modal")
  );
};

export default Modal;
