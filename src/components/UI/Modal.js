import styles from "./Modal.module.css";

const Modal = (props) => {
  return (
    <div className={styles.modal}>
      <div className={styles.overlay}></div>
      <div className={styles.content}>
        <div className={styles["close-btn"]}>&times;</div>
        <h1>New transaction</h1>
        {props.children}
      </div>
    </div>
  );
};

export default Modal;
