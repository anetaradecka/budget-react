import { Form, useActionData } from "react-router-dom";

import styles from "./AddTransactionForm.module.css";
import ButtonPrimary from "../buttons/ButtonPrimary";
import Container from "../../layout/Container";

const AddTransactionForm = (props) => {
  const actionData = useActionData();
  //TODO: use useActionData to validate input fields

  return (
    <Container>
      <Form method="post" className={styles["transaction-form"]}>
        {actionData && actionData.errors && (
          <ul>
            {Object.values(actionData.errors).map((err) => (
              <li key={err}>{err}</li>
            ))}
          </ul>
        )}
        {actionData && actionData.msg && <p>{actionData.msg}</p>}
        <div className={styles["form-control-group"]}>
          <div
            className={`${styles["form-control"]}`}
            // className={`${styles["form-control"]} ${
            //   !isValid ? styles.invalid : ""
            // }`}
          >
            <label htmlFor="category">category</label>
            <select id={styles.category} name="category">
              <option value="food">food</option>
              <option value="bills">bills</option>
              <option value="education">education</option>
            </select>
          </div>

          <div className={`${styles["form-control"]}`}>
            <label htmlFor="value">value</label>
            <input type="number" name="value" id="value" step="0.01" />
          </div>

          <div className={`${styles["form-control"]}`}>
            <label htmlFor="date">date</label>
            <input type="date" name="date" id="date" />
          </div>

          <div className={styles["form-control"]}>
            <label htmlFor="description">*description (optional)</label>
            <textarea name="description" id="description" rows="5"></textarea>
            <input type="hidden" name="actionType" value="add"></input>
          </div>
        </div>

        <ButtonPrimary type="submit">+ Add transaction</ButtonPrimary>

        <input type="hidden" name="_csrf" value="<%= csrfToken %>" />
        <input type="hidden" name="type" value="<%= type %>" />
      </Form>
    </Container>
  );
};

export default AddTransactionForm;
