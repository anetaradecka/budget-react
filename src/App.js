import NavPanel from "./components/UI/PanelLeft/PanelLeft";
import Expenses from "./pages/Transactions/Expenses";

function App() {
  return (
    <div className="body">
      <NavPanel />
      <Expenses />
    </div>
  );
}

export default App;
