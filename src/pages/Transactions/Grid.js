import styles from "./TransactionsGrid.module.css";

const Grid = (props) => {
  return <div className={styles['grid-row']}>{props.children}</div>;
};

export default Grid;
