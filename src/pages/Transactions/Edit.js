import { useSubmit } from "react-router-dom";

import styles from "./TransactionsGrid.module.css";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";

const Edit = (props) => {
  const submit = useSubmit();

  const deleteButtonHandler = () => {
    submit(
      { actionType: "delete", itemId: props.itemId },
      { method: "delete" }
    );
  };

  return (
    <div className={`${styles["cell-edit"]} ${styles["grid-cell"]}`}>
      <input
        type="hidden"
        value="<%= transaction.item._id %>"
        name="transactionId"
        data-type="<%= type %>"
      />
      <input type="hidden" name="type" value="<%= type %>" />
      <input type="hidden" name="_csrf" value="<%= csrfToken %>" />
      <FontAwesomeIcon icon={faPenToSquare} className={styles.fontawesome} />
      <button
        className={styles["btn-hidden"]}
        type="button"
        onClick={deleteButtonHandler}
        name="actionType"
        value="delete"
      >
        <FontAwesomeIcon icon={faTrash} className={styles.fontawesome} />
      </button>
    </div>
  );
};

export default Edit;
