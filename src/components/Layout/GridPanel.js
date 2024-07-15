// external libraries
import { useRef } from "react";
// styles
import styles from "./Layout.module.css";
// components
import GridRow from "./GridRow";

const GridPanel = (props) => {
  const scrollRef = useRef(null);
  // TODO: move category names to constants folder
  return (
    <div className={styles["grid-panel"]}>
      <section className={`${styles.grid}`}>
        <div className={`${styles.meta} ${styles["grid-row"]}`}>
          <div className={styles["grid-cell"]}></div>
          <div className={styles["grid-cell"]}>description</div>
          <div className={styles["grid-cell"]}>category</div>
          <div className={styles["grid-cell"]}>subcategory</div>
          <div className={styles["grid-cell"]}>date</div>
          <div className={styles["grid-cell"]}>inflow</div>
          <div className={styles["grid-cell"]}>outflow</div>
          <div
            className={`${styles["cell-edit"]} ${styles["grid-cell"]}`}
          ></div>
        </div>
        <div className={styles.scrollbar} ref={scrollRef}>
          {props.transactions.length === 0 && (
            <p className={styles.noresults}>No transactions found!</p>
          )}
          {props.transactions.length > 0 &&
            props.transactions.map((transaction) => (
              <GridRow
                key={transaction._id}
                transaction={transaction}
                onDelete={props.onDelete}
              />
            ))}
        </div>
      </section>
    </div>
  );
};

export default GridPanel;
