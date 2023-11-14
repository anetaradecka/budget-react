import { useLoaderData } from "react-router-dom";

import AddTransactionForm from "../../components/UI/forms/AddTransactionForm";
import TransactionsGrid from "./TransactionsGrid";

const Transactions = () => {
  let transactions = useLoaderData();

  const addTransactionHandler = (transactionData) => {
    // TODO: add state handler on add transaction FE
    transactions = (transactions) => {
      return [transactionData, ...transactions];
    };

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

    transactions = filteredTransactions;
    // setTransactions(filteredTransactions);
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

export async function loader() {
  const response = await fetch("http://localhost:8080/transactions");
  if (!response.ok) {
    //....
  } else {
    const resData = await response.json();
    return resData.transactions;
  }
}
