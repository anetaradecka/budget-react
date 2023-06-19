import styles from "./TransactionsGrid.module.css";

const TransactionData = (props) => {
  return (
    <>
      <div className={styles['grid-cell']}>{props.transaction.description}</div>
      <div className={styles['grid-cell']}>{props.transaction.category}</div>
      <div className={styles['grid-cell']}>{props.transaction.subcategory}</div>
      <div className={styles['grid-cell']}>{props.transaction.date.toDateString()}</div>
      <div className={styles['grid-cell']}>+{props.transaction.value}</div>
      <div className={styles['grid-cell']}>-{props.transaction.value}</div>
    </>
  );
};

export default TransactionData;
