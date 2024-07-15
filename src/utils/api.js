import { getAuthToken, getCSRFToken } from "./auth";

export async function fetchTransactionsList() {
  const token = getAuthToken();
  const csrfToken = getCSRFToken();

  const response = await fetch(`http://localhost:8080/transactions?page=1`, {
    headers: {
      // method: "GET", // Why blocked by CORS?
      Authorization: "Bearer " + token,
      "X-CSRF-Token": csrfToken,
    },
  });

  if (!response.ok) {
    throw new Response(
      JSON.stringify({ message: "Could not fetch transactions" }),
      { status: 500 }
    );
  }

  const data = await response.json();
  return data.transactions;
}

export async function deleteOneItem(itemId) {
  const token = getAuthToken();
  const csrfToken = getCSRFToken();

  const response = await fetch("http://localhost:8080/transactions/" + itemId, {
    method: "delete",
    headers: {
      Authorization: "Bearer " + token,
      "X-CSRF-Token": csrfToken,
    },
  });

  if (!response.ok) {
    throw new Response(
      JSON.stringify({ message: "Could not delete transaction" }),
      { status: 500 }
    );
  }
}

export async function submitNewItem(data) {
  const token = getAuthToken();
  const csrfToken = getCSRFToken();

  const submitData = {
    category: data.category,
    date: data.date,
    value: data.value,
    description: data.description,
    type: data.type,
  };

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
}
