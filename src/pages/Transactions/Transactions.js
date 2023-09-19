import { useEffect, useState } from "react";

import AddTransactionForm from "../../components/UI/forms/AddTransactionForm";
import TransactionsGrid from "./TransactionsGrid";

const Transactions = () => {
  const [transactions, setTransactions] = useState([]);
  useEffect(() => {
    fetch("http://localhost:8080/transactions")
      .then((res) => {
        if (res.status !== 200) {
          throw new Error("Failed to fetch transactions.");
        }
        return res.json();
      })
      .then((resData) => {
        setTransactions(resData.transactions);
      })
      .catch((err) => console.log(err));
  }, []);

  const addTransactionHandler = (transactionData) => {
    setTransactions((transactions) => {
      return [transactionData, ...transactions];
    });

    let url = "http://localhost:8080/transactions/add-transaction";
    let method = "POST";

    fetch(url, {
      method: method,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        category: transactionData.category,
        value: transactionData.value,
        description: transactionData.description,
        date: transactionData.date,
      }),
    })
      .then((res) => {
        if (res.status !== 200 && res.status !== 201) {
          throw new Error("Creating or editing a transaction failed!");
        }
        return res.json();
      })
      .then((res) => {
        console.log(res);
      });
  };

  const deleteTransactionHandler = (itemId) => {
    let filteredTransactions = [];
    transactions.filter((transaction) => {
      if (transaction._id !== itemId) {
        filteredTransactions.push(transaction);
      }
      return filteredTransactions;
    });

    setTransactions(filteredTransactions);

    let url = "http://localhost:8080/transactions/" + itemId;
    let method = "DELETE";

    fetch(url, { method: method })
      .then((res) => {
        if (res.status !== 200 && res.status !== 201) {
          throw new Error("Creating or editing a transaction failed!");
        }
        return res.json();
      })
      .then((res) => {
        console.log(res);
      });
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
