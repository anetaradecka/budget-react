import styles from "./Layout.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";

const Edit = () => {
  return (
    /* <input
        type="hidden"
        value="<%= transaction.item._id %>"
        name="transactionId"
        data-type="<%= type %>"
      />
      <input type="hidden" name="type" value="<%= type %>" />
      <input type="hidden" name="_csrf" value="<%= csrfToken %>" /> */
    <FontAwesomeIcon icon={faPenToSquare} className={styles.fontawesome} />
  );
};

export default Edit;
