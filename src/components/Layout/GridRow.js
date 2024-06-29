import styles from "./TransactionsGrid.module.css";

const GridRow = (props) => {
  return <div className={styles["grid-row"]}>{props.children}</div>;
};

export default GridRow;
