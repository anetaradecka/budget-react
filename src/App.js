import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Transactions, {
  loader as transactionsLoader,
} from "./pages/Transactions/Transactions";
import Dashboard from "./pages/Dashboard/Dashboard";
// import Signup from "./pages/Auth/Signup";
// import Login from "./pages/Auth/Login";
import RootLayout from "./pages/Root";
import ErrorPage from "./pages/Error";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        path: "/transactions",
        element: <Transactions />,
        loader: transactionsLoader,
      },
      { path: "dashboard", element: <Dashboard /> },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
