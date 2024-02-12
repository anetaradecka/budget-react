import styles from "./TransactionsGrid.module.css";

const TransactionData = (props) => {
  const convertToLocaleDate = (data) => {
    let date = new Date(data);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    date = `${year}/${month}/${day}`;
    String(date);
    return date;
  };

  const date = convertToLocaleDate(props.transaction.date);

  return (
    <>
      <div className={`${styles["grid-cell"]} ${styles["data-item"]}`}>
        {props.transaction.description}
      </div>
      <div className={`${styles["grid-cell"]} ${styles["data-item"]}`}>
        {props.transaction.category}
      </div>
      <div className={`${styles["grid-cell"]} ${styles["data-item"]}`}>
        {props.transaction.subcategory}
      </div>
      <div className={`${styles["grid-cell"]} ${styles["data-item"]}`}>
        {String(date)}
      </div>
      <div className={`${styles["grid-cell"]} ${styles["data-item"]}`}>
        {props.transaction.type === "inflow"
          ? `+ ${props.transaction.value} PLN`
          : ""}
      </div>
      <div className={`${styles["grid-cell"]} ${styles["data-item"]}`}>
        {props.transaction.type === "outflow"
          ? `- ${props.transaction.value} PLN`
          : ""}
      </div>
    </>
  );
};

export default TransactionData;
