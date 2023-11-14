import { useLoaderData, redirect } from "react-router-dom";

import AddTransactionForm from "../../components/UI/forms/AddTransactionForm";
import TransactionsGrid from "./TransactionsGrid";

const Transactions = () => {
  let transactions = useLoaderData();

  if (transactions.isError) {
    return <p>{transactions.message}</p>;
  }

  return (
    <>
      <AddTransactionForm />
      <TransactionsGrid transactions={transactions} />
    </>
  );
};

export default Transactions;

// Fetching data on component load
export async function loader() {
  const response = await fetch("http://localhost:8080/transactions");
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
  const requestData = await request.formData();
  const selectedAction = requestData.get("actionType");

  let response;

  switch (selectedAction) {
    case "delete":
      const transactionId = requestData.get("itemId");

      response = await fetch(
        "http://localhost:8080/transactions/" + transactionId,
        { method: request.method }
      );

      if (!response.ok) {
        throw new Response(
          JSON.stringify({ message: "Could not delete transaction" }),
          { status: 500 }
        );
      } else {
        return redirect("/transactions");
      }
    case "add":
      const submitData = {
        category: requestData.get("category"),
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
          },
          body: JSON.stringify({ submitData }),
        }
      );

      if (!response.ok) {
        throw new Response(
          JSON.stringify({ message: "Could not send transaction data" }),
          { status: 500 }
        );
      } else {
        return redirect("/transactions");
      }

    default:
      console.log("Incorrect action!");
  }
}
