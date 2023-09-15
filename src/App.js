import Header from "./components/layout/Header/Header";
import Sidebar from "./components/layout/Sidebar/Sidebar";
import Main from "./components/layout/Main/Main";
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
