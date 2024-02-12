import { Form, useActionData } from "react-router-dom";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUp, faArrowDown } from "@fortawesome/free-solid-svg-icons";

import styles from "./AddTransactionForm.module.css";
import ButtonPrimary from "../buttons/ButtonPrimary";
import Modal from "../Modal";

const AddTransactionForm = (props) => {
  const actionData = useActionData();
  //TODO: use useActionData to validate input fields

  return (
    <Modal>
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
          <div className={`${styles["icon-circle"]} ${styles.activ}`}>
            <FontAwesomeIcon className={styles.icon} icon={faArrowUp} />
          </div>
          Outflow
          <div className={styles["icon-circle"]}>
            <FontAwesomeIcon className={styles.icon} icon={faArrowDown} />
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
        {/* <input type="hidden" name="type" value="<%= type %>" /> */}
      </Form>
    </Modal>
  );
};

export default AddTransactionForm;
