import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Transactions, {
  loader as transactionsLoader,
  action as newTransactionAction,
} from "./pages/Transactions/Transactions";
import Dashboard from "./pages/Dashboard/Dashboard";
// import Auth from "./pages/Auth/Auth";
import RootLayout from "./pages/Root";
import ErrorPage from "./pages/Error";
import LandingPage from "./pages/Landing";
import Login from "./pages/Auth/Login";
import Signup from "./pages/Auth/Signup";

const router = createBrowserRouter([
  {
    path: "/",
    index: true,
    element: <LandingPage />,
    errorElement: <ErrorPage />,
  },
  {
    path: "login",
    index: true,
    element: <Login />,
    errorElement: <ErrorPage />,
  },
  {
    path: "signup",
    index: true,
    element: <Signup />,
    errorElement: <ErrorPage />,
  },
  {
    path: "app",
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        path: "transactions",
        element: <Transactions />,
        loader: transactionsLoader,
        action: newTransactionAction,
      },
      { path: "dashboard", element: <Dashboard /> },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
