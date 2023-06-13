import { useState } from "react";

import DUMMY_TRANSACTIONS from "./../../data/dummyTransactions";

import Main from "./../../components/layout/Main";
import AddTransaction from "./../../components/AddTransaction";
import Transactions from "../../components/transactions/Transactions";
import PanelTop from "../../components/UI/PanelTop/PanelTop";

const Expenses = () => {
  const [transactions, setTransations] = useState(DUMMY_TRANSACTIONS);
  const [filteredMonth, setSelectedMonth] = useState("");
  console.log(filteredMonth + ' from App.js');
  const addTransactionHandler = (transaction) => {
    setTransations((prevState) => {
      return [transaction, ...prevState];
    });
  };

  const filterChangeHandler = (selectedMonth) => {
    setSelectedMonth(selectedMonth);
  };

  return (
    <Main>
      <PanelTop onFilterChange={filterChangeHandler} />
      <AddTransaction onAddTransaction={addTransactionHandler} />
      <Transactions filteredMonth={filteredMonth} transactions={transactions} />
    </Main>
  );
};

export default Expenses;
