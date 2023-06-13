import "./Transactions.css";

import Grid from "./Grid";
import Img from "./Img";
import Edit from "./Edit";
import TransactionData from "./TransactionData";

// import months from "../../data/months";

const Transactions = (props) => {
  // const filteredTransactions = props.transactions.filter((transaction) => {
  //   const month = months[transaction.date.getMonth()];
  //   return month === props.filteredMonth;
  // });

  return (
    <div className="container transactions-panel">
      <section className="grid">
        <div className="grid-row meta">
          <div className="grid-cell"></div>
          <div className="grid-cell">description</div>
          <div className="grid-cell">category</div>
          <div className="grid-cell">subcategory</div>
          <div className="grid-cell">date</div>
          <div className="grid-cell">inflow</div>
          <div className="grid-cell">outflow</div>
          <div className="grid-cell cell-edit"></div>
        </div>

        {props.transactions.length === 0 && <p>No transactions found!</p>}
        {props.transactions.length > 0 &&
          props.transactions.map((transaction) => (
            <Grid key={transaction.id}>
              <Img />
              <TransactionData transaction={transaction} />
              <Edit />
            </Grid>
          ))}

        {/* {filteredTransactions.length === 0 && <p>No transactions found!</p>}
        {filteredTransactions.length > 0 &&
          filteredTransactions.map((transaction) => (
            <Grid key={transaction.id}>
              <Img />
              <TransactionData transaction={transaction} />
              <Edit />
            </Grid>
          ))} */}
      </section>
    </div>
  );
};

export default Transactions;
