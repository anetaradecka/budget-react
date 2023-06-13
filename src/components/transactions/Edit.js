import "./Transactions.css";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";

const Edit = () => {
  return (
    <div className="grid-cell cell-edit">
      <input
        type="hidden"
        value="<%= transaction.item._id %>"
        name="transactionId"
        data-type="<%= type %>"
      />
      <input type="hidden" name="type" value="<%= type %>" />
      <input type="hidden" name="_csrf" value="<%= csrfToken %>" />
      <FontAwesomeIcon icon={faPenToSquare} className="fontawesome" />
      <button className="btn-hidden" type="button">
        <FontAwesomeIcon icon={faTrash} className="fontawesome" />
      </button>
    </div>
  );
};

export default Edit;
