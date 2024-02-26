import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getAuthToken } from "../../util/auth";
import { getCSRFToken } from "../../util/auth";

import styles from "./TransactionsGrid.module.css";

import Grid from "./Grid";
import Img from "./Img";
import Edit from "./Edit";
import Delete from "./Delete";
import TransactionData from "./TransactionData";
import Container from "../../components/layout/Container";
import AddTransaction from "./AddTransaction";

const Transactions = () => {
  const scrollRef = useRef(null);
  const [page, setPage] = useState(1);
  const [transactions, setTransactions] = useState([]);
  // const [newTransaction, setNewTransactions] = useState(false);
  // const navigate = useNavigate();

  useEffect(() => {
    console.log(`tu jestem`);
    const token = getAuthToken();
    const csrfToken = getCSRFToken();

    fetch(`http://localhost:8080/transactions?page=${page}`, {
      headers: {
        Authorization: "Bearer " + token,
        "X-CSRF-Token": csrfToken,
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Response(
            JSON.stringify({ message: "Could not fetch transactions" }),
            { status: 500 }
          );
        } else {
          return response.json();
        }
      })
      .then((data) => {
        console.log(data);
        setTransactions((prev) => [...prev, ...data.transactions]);
      });
  }, [page]);

  useEffect(() => {
    console.log(`tu jestem`);
    const token = getAuthToken();
    const csrfToken = getCSRFToken();

    fetch(`http://localhost:8080/transactions?page=${page}`, {
      headers: {
        Authorization: "Bearer " + token,
        "X-CSRF-Token": csrfToken,
      },
    }).then((response) => {
      if (!response.ok) {
        throw new Response(
          JSON.stringify({ message: "Could not fetch transactions" }),
          { status: 500 }
        );
      } else {
        return response.json();
      }
    });
  });

  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + document.documentElement.scrollTop + 1 >=
        document.documentElement.scrollHeight
      ) {
        setPage((prev) => prev + 1);
      }
    };

    const element = scrollRef.current;

    element.addEventListener("scroll", handleScroll);

    return () => {
      element.removeEventListener("scroll", handleScroll);
    };
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

    let response = await fetch(
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

    if (response === 422) {
      return response;
    }

    if (!response.ok) {
      throw new Response(
        JSON.stringify({ message: "Could not add transaction" }),
        { status: 500 }
      );
    }

    // await fetch(`http://localhost:8080/transactions?page=${page}`, {
    //   headers: {
    //     Authorization: "Bearer " + token,
    //     "X-CSRF-Token": csrfToken,
    //   },
    // })
    //   .then((response) => {
    //     if (!response.ok) {
    //       throw new Response(
    //         JSON.stringify({ message: "Could not fetch transactions" }),
    //         { status: 500 }
    //       );
    //     } else {
    //       return response.json();
    //     }
    //   })
    //   .then((data) => {
    //     console.log(data);

    //     setTransactions(data.transactions);
    //     console.log(transactions);
    //   });
  };

  return (
    <>
      <AddTransaction onTransactionSubmit={handleTransactionSubmit} />
      <Container>
        <div className={styles["grid-panel"]}>
          <section className={`${styles.grid}`}>
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
            <div className={styles.scrollbar} ref={scrollRef}>
              {transactions.length === 0 && (
                <p className={styles.noresults}>No transactions found!</p>
              )}
              {transactions.length > 0 &&
                transactions.map((transaction) => (
                  <Grid key={transaction._id}>
                    <Img />
                    <TransactionData transaction={transaction} />
                    <div
                      className={`${styles["cell-edit"]} ${styles["grid-cell"]}`}
                    >
                      <Edit itemId={transaction._id} />
                      <Delete
                        itemId={transaction._id}
                        onItemDelete={handleItemDelete}
                      />
                    </div>
                  </Grid>
                ))}
            </div>
          </section>
        </div>
      </Container>
    </>
  );
};

export default Transactions;
