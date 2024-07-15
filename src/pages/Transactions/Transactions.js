// external libraries
import { useState, useEffect } from "react";
import { redirect } from "react-router-dom";
// components
import Container from "../../components/Containers/Container/Container";
import AddTransactionSection from "../../components/Sections/AddTransactionSection";
import GridPanel from "../../components/Layout/GridPanel";
// utils
import {
  fetchTransactionsList,
  deleteOneItem,
  submitNewItem,
} from "../../utils/api";

const Transactions = () => {
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    async function fetchTransactions() {
      const transactions = await fetchTransactionsList();
      setTransactions(transactions);
    }

    fetchTransactions();
  }, []);

  const handleItemDelete = async (itemId) => {
    const filteredItems = transactions.filter((item) => {
      return item._id !== itemId;
    });

    setTransactions(filteredItems);
    deleteOneItem(itemId);
  };

  const handleTransactionSubmit = async (data) => {
    await submitNewItem(data);

    async function fetchTransactions() {
      const transactions = await fetchTransactionsList();
      setTransactions(transactions);
    }

    fetchTransactions();
  };

  return (
    <>
      <AddTransactionSection onTransactionSubmit={handleTransactionSubmit} />
      <Container>
        <GridPanel transactions={transactions} onDelete={handleItemDelete} />
      </Container>
    </>
  );
};

export const addTransactionAction = async ({ request }) => {
  return redirect("/app/transactions");
};

export default Transactions;
