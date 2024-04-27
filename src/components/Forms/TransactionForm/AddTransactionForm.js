// import { Form, useActionData } from "react-router-dom";
import { Form } from "react-router-dom";
import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUp, faArrowDown } from "@fortawesome/free-solid-svg-icons";

import styles from "./AddTransactionForm.module.css";
import ButtonPrimary from "../../Buttons/ButtonPrimary";
import categories from "../../../mockData/categories";

const AddTransactionForm = (props) => {
  const [transactionType, setTransactionType] = useState("");
  const [category, setCategory] = useState("");
  const [amount, setAmount] = useState("");
  const [date, setDate] = useState("");
  const [description, setDescription] = useState("");

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
  };

  const handleAmountValueChange = (event) => {
    setAmount(event.target.value);
  };

  const handleDateValueChange = (event) => {
    setDate(event.target.value);
  };

  const handleDescriptionValueChange = (event) => {
    setDescription(event.target.value);
  };

  const handleCategoryValueChange = (event) => {
    setCategory(event.target.value);
  };

  const onFormSubmitHandler = () => {
    const submitData = {
      category: category,
      date: date,
      value: amount,
      description: description,
      type: transactionType,
    };

    props.onTransactionSubmit(submitData);

    setTransactionType("");
    setAmount("");
    setCategory("");
    setDate("");
    setDescription("");
  };

  // const errors = useActionData();

  return (
    <>
      {/* {errors && (
        <div className={`${styles["error-msg"]} ${styles["form-outside"]}`}>
          <p>{errors}</p>
        </div>
      )} */}
      <Form
        method="post"
        className={styles["transaction-form"]}
        onSubmit={onFormSubmitHandler}
        action="/app/transactions"
      >
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
            <select
              id={styles.category}
              name="category"
              onChange={handleCategoryValueChange}
              value={category}
            >
              <option>Select</option>
              {categories &&
                categories.map((cat, index) => {
                  return <option key={index}>{cat}</option>;
                })}
            </select>
          </div>

          <div className={`${styles["form-control-items-group"]}`}>
            <div className={`${styles["form-control"]}`}>
              <label htmlFor="value">Amount</label>
              <input
                type="number"
                name="value"
                id="value"
                step="0.01"
                onChange={handleAmountValueChange}
                value={amount}
              />
            </div>

            <div className={`${styles["form-control"]}`}>
              <label htmlFor="date">Date</label>
              <input
                type="date"
                name="date"
                id="date"
                onChange={handleDateValueChange}
                value={date}
              />
            </div>
          </div>

          <div className={styles["form-control"]}>
            <label htmlFor="description">Description (optional)</label>
            <textarea
              name="description"
              id="description"
              rows="5"
              onChange={handleDescriptionValueChange}
              value={description}
            ></textarea>
            <input type="hidden" name="actionType" value="add"></input>
          </div>
        </div>

        <div className={styles.buttons}>
          <ButtonPrimary type="submit">Save</ButtonPrimary>
        </div>
        <input type="hidden" name="type" />
      </Form>
    </>
  );
};

export default AddTransactionForm;
