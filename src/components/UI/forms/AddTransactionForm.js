import { Form, useActionData } from "react-router-dom";
import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUp, faArrowDown } from "@fortawesome/free-solid-svg-icons";

import styles from "./AddTransactionForm.module.css";
import ButtonPrimary from "../buttons/ButtonPrimary";

const AddTransactionForm = () => {
  const [transactionType, setTransactionType] = useState("");

  useEffect(() => {
    document.querySelector('input[name="type"]').value = transactionType;
  }, [transactionType]);

  const onTransactionIconClick = (event) => {
    const type = event.target.dataset.value;
    switch (type) {
      case "inflow":
        setTransactionType("inflow");
        break;
      case "outflow":
        setTransactionType("outflow");
        break;
      default:
    }

    console.log(transactionType);
  };

  const actionData = useActionData();
  //TODO: use useActionData to validate input fields

  return (
    <Form method="post" className={styles["transaction-form"]}>
      {actionData && actionData.errors && (
        <ul>
          {Object.values(actionData.errors).map((err) => (
            <li key={err}>{err}</li>
          ))}
        </ul>
      )}
      {actionData && actionData.msg && <p>{actionData.msg}</p>}
      <div className={`${styles["form-control-items-group"]}`}>
        <div
          className={
            transactionType && transactionType === "outflow"
              ? `${styles["icon-circle"]} ${styles.activ}`
              : `${styles["icon-circle"]}`
          }
          onClick={onTransactionIconClick}
          data-value="outflow"
        >
          <FontAwesomeIcon
            className={styles.icon}
            icon={faArrowUp}
            data-value="outflow"
          />
        </div>
        Outflow
        <div
          className={
            transactionType && transactionType === "inflow"
              ? `${styles["icon-circle"]} ${styles.activ}`
              : `${styles["icon-circle"]}`
          }
          onClick={onTransactionIconClick}
          data-value="inflow"
        >
          <FontAwesomeIcon
            className={styles.icon}
            icon={faArrowDown}
            data-value="inflow"
          />
        </div>
        Inflow
      </div>
      <div className={styles["form-control-group"]}>
        <div className={`${styles["form-control"]}`}>
          <label htmlFor="category">Category</label>
          <select id={styles.category} name="category">
            <option value="food">food</option>
            <option value="bills">bills</option>
            <option value="education">education</option>
          </select>
        </div>

        <div className={`${styles["form-control-items-group"]}`}>
          <div className={`${styles["form-control"]}`}>
            <label htmlFor="value">Amount</label>
            <input type="number" name="value" id="value" step="0.01" />
          </div>

          <div className={`${styles["form-control"]}`}>
            <label htmlFor="date">Date</label>
            <input type="date" name="date" id="date" />
          </div>
        </div>

        <div className={styles["form-control"]}>
          <label htmlFor="description">Description (optional)</label>
          <textarea name="description" id="description" rows="5"></textarea>
          <input type="hidden" name="actionType" value="add"></input>
        </div>
      </div>

      <div className={styles.buttons}>
        <ButtonPrimary type="submit">Save</ButtonPrimary>
      </div>
      {/* <input type="hidden" name="_csrf" value="<%= csrfToken %>" /> */}
      <input type="hidden" name="type" />
    </Form>
  );
};

export default AddTransactionForm;
