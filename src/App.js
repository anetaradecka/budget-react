import Header from "./components/UI/Header/Header";
import Sidebar from "./components/UI/Sidebar/Sidebar";
import Main from "./components/UI/Main/Main";
import Transactions from "./pages/Transactions/Transactions";

function App() {
  const pageTitle = "Transaction history";

  return (
    <div className="body">
      <Sidebar />
      <Header pageTitle={pageTitle} />
      <Main>
        <Transactions />
      </Main>
    </div>
  );
}

export default App;
