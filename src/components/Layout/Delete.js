import styles from "./TransactionsGrid.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

const Delete = (props) => {
  return (
    <button
      className={styles["btn-hidden"]}
      type="button"
      onClick={() => props.onItemDelete(props.itemId)}
      value="delete"
    >
      <FontAwesomeIcon icon={faTrash} className={styles.fontawesome} />
    </button>
  );
};

export default Delete;
