import { useState } from "react";

import DUMMY_TRANSACTIONS from "../data/dummyTransactions";
import AddTransactionForm from "../components/forms/AddTransactionForm";
import TransactionsGrid from "../components/UI/Main/transactions/TransactionsGrid";

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
