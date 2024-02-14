import { useLoaderData, redirect } from "react-router-dom";

import AddTransaction from "./AddTransaction";
import TransactionsGrid from "./TransactionsGrid";
import { getAuthToken } from "../../util/auth";

const Transactions = () => {
  let transactions = useLoaderData();

  if (transactions.isError) {
    return <p>{transactions.message}</p>;
  }

  return (
    <>
      <AddTransaction />
      <TransactionsGrid transactions={transactions} />
    </>
  );
};

export default Transactions;

// Fetching data on component load
export async function loader() {
  const token = getAuthToken();

  const response = await fetch("http://localhost:8080/transactions", {
    headers: {
      Authorization: "Bearer " + token,
    },
  });

  if (!response.ok) {
    throw new Response(
      JSON.stringify({ message: "Could not fetch transactions" }),
      { status: 500 }
    );
  } else {
    const resData = await response.json();
    return resData.transactions;
  }
}

// Actions taken basen on request POST/DELETE method
export async function action({ request, params }) {
  const token = getAuthToken();
  const requestData = await request.formData();
  const selectedAction = requestData.get("actionType");

  const type = String(requestData.get("type"));
  const category = String(requestData.get("category"));
  const value = String(requestData.get("value"));
  const date = String(requestData.get("date"));

  let errors = "";

  if (!type || !value || !date || category === "Selected") {
    errors = "Transaction type, category, amount and date must be selected.";
    return errors;
  }

  let response;

  switch (selectedAction) {
    case "delete":
      const transactionId = requestData.get("itemId");

      response = await fetch(
        "http://localhost:8080/transactions/" + transactionId,
        {
          method: request.method,
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );

      if (!response.ok) {
        throw new Response(
          JSON.stringify({ message: "Could not delete transaction" }),
          { status: 500 }
        );
      } else {
        return redirect("/app/transactions");
      }
    case "add":
      const submitData = {
        category: requestData.get("category"),
        type: requestData.get("type"),
        date: requestData.get("date"),
        value: requestData.get("value"),
        description: requestData.get("description"),
      };

      response = await fetch(
        "http://localhost:8080/transactions/add-transaction",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + token,
          },
          body: JSON.stringify({ submitData }),
        }
      );

      if (response === 422) {
        return response;
      } else {
        return redirect("/app/transactions");
      }

    default:
      console.log("Incorrect action!");
  }
}
