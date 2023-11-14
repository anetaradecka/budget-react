import styles from "./TransactionsGrid.module.css";

import Grid from "./Grid";
import Img from "./Img";
import Edit from "./Edit";
import TransactionData from "./TransactionData";
import Container from "../../components/layout/Container";

const TransactionsGrid = (props) => {
  return (
    <Container>
      <div className={styles["grid-panel"]}>
        <section className={styles.grid}>
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

          {props.transactions.length === 0 && (
            <p className={styles.noresults}>No transactions found!</p>
          )}
          {props.transactions.length > 0 &&
            props.transactions.map((transaction) => (
              <Grid key={transaction._id}>
                <Img />
                <TransactionData transaction={transaction} />
                <Edit itemId={transaction._id} />
              </Grid>
            ))}
        </section>
      </div>
    </Container>
  );
};

export default TransactionsGrid;
