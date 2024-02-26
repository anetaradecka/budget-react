import { createBrowserRouter, RouterProvider } from "react-router-dom";
// import Transactions, {
//   // loader as transactionsLoader,
//   action as newTransactionAction,
// } from "./pages/Transactions/Transactions";
import Transactions from "./pages/Transactions/Transactions"; // loader as transactionsLoader,
import RootLayout from "./pages/Root";
import ErrorPage from "./pages/Error";
import Login, { action as loginAction } from "./pages/Auth/Login";
import Signup, { action as signupAction } from "./pages/Auth/Signup";
import { action as logoutAction } from "./pages/Logout";
import { checkAuthLoader } from "./util/auth";
// import TransactionsGrid from "./pages/Transactions/TransactionsGrid";
// import Transactions from "./pages/Transactions/TransactionsOld";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
    errorElement: <ErrorPage />,
    action: loginAction,
  },
  {
    path: "/signup",
    element: <Signup />,
    errorElement: <ErrorPage />,
    action: signupAction,
  },
  {
    path: "/logout",
    action: logoutAction,
    loader: checkAuthLoader,
  },
  {
    path: "/app",
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        path: "transactions",
        element: <Transactions />,
        // loader: transactionsLoader,
        // action: newTransactionAction,
      },
    ],
    loader: checkAuthLoader,
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
