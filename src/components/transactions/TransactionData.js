import "./Transactions.css";

const TransactionData = (props) => {
  return (
    <>
      <div className="grid-cell">{props.transaction.description}</div>
      <div className="grid-cell">{props.transaction.category}</div>
      <div className="grid-cell">{props.transaction.subcategory}</div>
      <div className="grid-cell">{props.transaction.date.toISOString()}</div>
      <div className="grid-cell">+{props.transaction.value}</div>
      <div className="grid-cell">-{props.transaction.value}</div>
    </>
  );
};

export default TransactionData;
