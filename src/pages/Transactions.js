import DUMMY_TRANSACTIONS from "../data/dummyTransactions";
import AddTransactionForm from "../components/forms/AddTransactionForm";
import TransactionsGrid from "../components/UI/Main/transactions/TransactionsGrid";

const Transactions = () => {

  return (
    <>
      <AddTransactionForm />
      <TransactionsGrid transactions={ DUMMY_TRANSACTIONS} />
    </>
  );
};

export default Transactions;
