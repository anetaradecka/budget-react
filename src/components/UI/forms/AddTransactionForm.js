import { useState } from "react";

import styles from "./AddTransactionForm.module.css";
import ButtonPrimary from "../buttons/ButtonPrimary";
import Container from "../../layout/Container";

const AddTransactionForm = (props) => {
  //TODO: use useReducer instead of useState
  const [enteredCategory, setEnteredCategory] = useState("food");
  const [enteredValue, setEnteredValue] = useState("");
  const [enteredDate, setEnteredDate] = useState("");
  const [enteredDescription, setEnteredDescription] = useState("");
  const [isValid, setIsValid] = useState(true);

  const resetErrorMsg = (event) => {
    if (event.target.value.trim().length > 0) {
      setIsValid(true);
    }
  };
  const categoryChangeHandler = (event) => {
    resetErrorMsg(event);
    setEnteredCategory(event.target.value);
  };

  const valueChangeHandler = (event) => {
    resetErrorMsg(event);
    setEnteredValue(event.target.value);
  };

  const dateChangeHandler = (event) => {
    resetErrorMsg(event);
    setEnteredDate(event.target.value);
  };

  const descriptionChangeHandler = (event) => {
    resetErrorMsg(event);
    setEnteredDescription(event.target.value);
  };

  const submitHandler = (event) => {
    event.preventDefault();
    if (enteredValue.length === 0 || enteredDate.length === 0) {
      setIsValid(false);
      return;
    }
    const transactionData = {
      category: enteredCategory,
      value: enteredValue,
      date: new Date(enteredDate),
      description: enteredDescription,
    };

    props.onAddTransaction(transactionData);
    setEnteredCategory("");
    setEnteredValue("");
    setEnteredDate("");
    setEnteredDescription("");
  };

  return (
    <Container>
      <form className={styles["transaction-form"]} onSubmit={submitHandler}>
        <div className={styles["form-control-group"]}>
          <div
            className={`${styles["form-control"]} ${
              !isValid ? styles.invalid : ""
            }`}
          >
            <label htmlFor="category">category</label>
            <select
              id={styles.category}
              name="category"
              onChange={categoryChangeHandler}
            >
              <option value="food">food</option>
              <option value="bills">bills</option>
              <option value="education">education</option>
            </select>
          </div>

          <div
            className={`${styles["form-control"]} ${
              !isValid ? styles.invalid : ""
            }`}
          >
            <label htmlFor="value">value</label>
            <input
              type="number"
              name="value"
              id="value"
              step="0.01"
              value={enteredValue}
              onChange={valueChangeHandler}
            />
          </div>

          <div
            className={`${styles["form-control"]} ${
              !isValid ? styles.invalid : ""
            }`}
          >
            <label htmlFor="date">date</label>
            <input
              type="date"
              name="date"
              id="date"
              value={enteredDate}
              onChange={dateChangeHandler}
            />
          </div>

          <div className={styles["form-control"]}>
            <label htmlFor="description">*description (optional)</label>
            <textarea
              name="comment"
              id="comment"
              rows="5"
              value={enteredDescription}
              onChange={descriptionChangeHandler}
            ></textarea>
          </div>
        </div>

        <ButtonPrimary type="submit">+ Add transaction</ButtonPrimary>

        <input type="hidden" name="_csrf" value="<%= csrfToken %>" />
        <input type="hidden" name="type" value="<%= type %>" />
      </form>
    </Container>
  );
};

export default AddTransactionForm;
