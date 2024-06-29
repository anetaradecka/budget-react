import { useState, useRef, useEffect } from "react";
import { redirect } from "react-router-dom";
import { getAuthToken } from "../../utils/auth";
import { getCSRFToken } from "../../utils/auth";

// import styles from "./TransactionsGrid.module.css";

// import Grid from "../../components/Layout/Grid";
// import Img from "../../components/Layout/Img";
// import Edit from "../../components/Layout/Edit";
// import Delete from "../../components/Layout/Delete";
// import TransactionData from "../../components/Layout/TransactionData";
import Container from "../../components/Containers/Container/Container";
import AddTransactionSection from "../../components/Sections/AddTransactionSection";
import GridPanel from "../../components/Layout/GridPanel";

const Transactions = () => {
  const scrollRef = useRef(null);
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    async function fetchTransactions() {
      const token = getAuthToken();
      const csrfToken = getCSRFToken();

      const response = await fetch(
        `http://localhost:8080/transactions?page=1`,
        {
          headers: {
            // method: "GET", // Why blocked by CORS?
            Authorization: "Bearer " + token,
            "X-CSRF-Token": csrfToken,
          },
        }
      );

      if (!response.ok) {
        throw new Response(
          JSON.stringify({ message: "Could not fetch transactions" }),
          { status: 500 }
        );
      }

      const data = await response.json();
      setTransactions(data.transactions);
    }

    fetchTransactions();
  }, []);

  const handleItemDelete = async (itemId) => {
    const filteredItems = transactions.filter((item) => {
      return item._id !== itemId;
    });

    setTransactions(filteredItems);

    const token = getAuthToken();
    const csrfToken = getCSRFToken();

    const response = await fetch(
      "http://localhost:8080/transactions/" + itemId,
      {
        method: "delete",
        headers: {
          Authorization: "Bearer " + token,
          "X-CSRF-Token": csrfToken,
        },
      }
    );

    if (!response.ok) {
      throw new Response(
        JSON.stringify({ message: "Could not delete transaction" }),
        { status: 500 }
      );
    }
  };

  const handleTransactionSubmit = async (data) => {
    const submitData = {
      category: data.category,
      date: data.date,
      value: data.value,
      description: data.description,
      type: data.type,
    };

    const token = getAuthToken();
    const csrfToken = getCSRFToken();

    const response = await fetch(
      "http://localhost:8080/transactions/add-transaction",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
          "X-CSRF-Token": csrfToken,
        },
        body: JSON.stringify({ submitData }),
      }
    );

    if (!response.ok) {
      throw new Response(
        JSON.stringify({ message: "Could not add transaction" }),
        { status: 500 }
      );
    }

    async function fetchTransactions() {
      const token = getAuthToken();
      const csrfToken = getCSRFToken();

      const response = await fetch(
        `http://localhost:8080/transactions?page=1`,
        {
          headers: {
            // method: "GET", // Why blocked by CORS?
            Authorization: "Bearer " + token,
            "X-CSRF-Token": csrfToken,
          },
        }
      );

      if (!response.ok) {
        throw new Response(
          JSON.stringify({ message: "Could not fetch transactions" }),
          { status: 500 }
        );
      }

      const data = await response.json();
      setTransactions(data.transactions);
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
