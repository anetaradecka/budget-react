import { useState } from "react";

import "./../assets/global.css";
import "./AddTransaction.css";
import Button from "./UI/Button";

const AddTransaction = (props) => {
  const [enteredCategory, setEnteredCategory] = useState("");
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
      id: Math.random().toString(),
    };

    props.onAddTransaction(transactionData);
    setEnteredCategory("");
    setEnteredValue("");
    setEnteredDate("");
    setEnteredDescription("");
  };

  return (
    <div className="container">
      <form className="transaction-form" onSubmit={submitHandler}>
        <div className="form-control-group">
          <div className={`form-control ${!isValid ? "invalid" : ""}`}>
            <label htmlFor="category">category</label>
            <select id="category" name="category">
              <option value={enteredCategory} onChange={categoryChangeHandler}>
                category
              </option>
            </select>
          </div>

          <div className={`form-control ${!isValid ? "invalid" : ""}`}>
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

          <div className={`form-control ${!isValid ? "invalid" : ""}`}>
            <label htmlFor="date">date</label>
            <input
              type="date"
              name="date"
              id="date"
              value={enteredDate}
              onChange={dateChangeHandler}
            />
          </div>

          <div className="form-control">
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

        <Button type="submit">+ Add transaction</Button>

        <input type="hidden" name="_csrf" value="<%= csrfToken %>" />
        <input type="hidden" name="type" value="<%= type %>" />
      </form>
    </div>
  );
};

export default AddTransaction;
