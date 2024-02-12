import { createPortal } from "react-dom";
import { useEffect, useRef } from "react";
import styles from "./Modal.module.css";
import AddTransactionForm from "./forms/AddTransactionForm";

const Modal = (props) => {
  const contentRef = useRef(null);

  const handleBtnClose = () => {
    props.onModalClose();
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleOutsideClick);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  });

  const handleOutsideClick = (e) => {
    if (contentRef.current && !contentRef.current.contains(e.target)) {
      props.onModalClose();
    }
  };

  return createPortal(
    <div
      className={
        props.isVisible ? `${styles.modal} ${styles.active}` : styles.modal
      }
    >
      <div className={styles.overlay}></div>
      <div
        className={styles.content}
        ref={contentRef}
        onClick={handleOutsideClick}
      >
        <div className={styles["close-btn"]} onClick={handleBtnClose}>
          &times;
        </div>
        <h2>New transaction</h2>
        <AddTransactionForm />
      </div>
    </div>,
    document.getElementById("modal")
  );
};

export default Modal;
