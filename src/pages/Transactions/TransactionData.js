import styles from "./TransactionsGrid.module.css";

const TransactionData = (props) => {
  //TODO: Find a way to display date elegantly
  const convertToLocaleDate = (date) => {
    const dateConverted = new Date(date);
    dateConverted.toLocaleString();
    return dateConverted;
  };

  const dateConverted = convertToLocaleDate(props.transaction.date);

  return (
    <>
      <div className={styles["grid-cell"]}>{props.transaction.description}</div>
      <div className={styles["grid-cell"]}>{props.transaction.category}</div>
      <div className={styles["grid-cell"]}>{props.transaction.subcategory}</div>
      <div className={styles["grid-cell"]}>{String(dateConverted)}</div>
      <div className={styles["grid-cell"]}>+{props.transaction.value}</div>
      <div className={styles["grid-cell"]}>-{props.transaction.value}</div>
    </>
  );
};

export default TransactionData;
