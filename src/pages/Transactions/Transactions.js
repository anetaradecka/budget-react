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

  const deleteTransactionHandler = (itemId) => {
    let filteredTransactions = [];
    transactions.filter((transaction) => {
      if (transaction.id !== itemId) {
        filteredTransactions.push(transaction);
      }
      return filteredTransactions;
    });

    setTransactions(filteredTransactions);
  };

  return (
    <>
      <AddTransactionForm onAddTransaction={addTransactionHandler} />
      <TransactionsGrid
        transactions={transactions}
        onDeleteTransactionHandler={deleteTransactionHandler}
      />
    </>
  );
};

export default Transactions;
