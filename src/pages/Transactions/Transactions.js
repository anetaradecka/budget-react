import { useState } from "react";

import DUMMY_TRANSACTIONS from "../../assets/dummyTransactions";
import AddTransactionForm from "../../components/UI/forms/AddTransactionForm";
import TransactionsGrid from "./TransactionsGrid";

const Transactions = () => {
  const [transactions, setTransactions] = useState(DUMMY_TRANSACTIONS);

  const addTransactionHandler = (transactionData) => {
    setTransactions((transactions) => {
      return [transactionData, ...transactions];
    });
  };

  return (
    <>
      <AddTransactionForm onAddTransaction={addTransactionHandler} />
      <TransactionsGrid transactions={transactions} />
    </>
  );
};

export default Transactions;
