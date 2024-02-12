import { createPortal } from "react-dom";
import styles from "./Modal.module.css";
import AddTransactionForm from "./forms/AddTransactionForm";

const Modal = (props) => {
  const handleBtnClose = () => {
    props.onModalClose();
  };

  return createPortal(
    <div
      className={
        props.isVisible ? `${styles.modal} ${styles.active}` : styles.modal
      }
    >
      <div className={styles.overlay}></div>
      <div className={styles.content}>
        <div className={styles["close-btn"]} onClick={handleBtnClose}>
          &times;
        </div>
        <h1>New transaction</h1>
        <AddTransactionForm />
      </div>
    </div>,
    document.getElementById("modal")
  );
};

export default Modal;
