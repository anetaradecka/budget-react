import {
  createBrowserRouter,
  RouterProvider,
  useLocation,
} from "react-router-dom";

import Transactions, {
  loader as transactionsLoader,
  action as newTransactionAction,
} from "./pages/Transactions/Transactions";
import RootLayout from "./pages/Root";
import ErrorPage from "./pages/Error";
// import LandingPage from "./pages/Landing";
import Login, { action as loginAction } from "./pages/Auth/Login";
import Signup, { action as signupAction } from "./pages/Auth/Signup";
import { action as logoutAction } from "./pages/Logout";
import { checkAuthLoader } from "./util/auth";

const router = createBrowserRouter([
  // LP moved to a separate project
  // {
  //   path: "/",
  //   index: true,
  //   element: <LandingPage />,
  //   errorElement: <ErrorPage />,
  // },
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
        loader: transactionsLoader,
        action: newTransactionAction,
      },
    ],
    loader: checkAuthLoader,
  },
]);

// export const LocationDisplay = () => {
//   const location = useLocation();

//   return <div data-testid="location-display">{location.pathname}</div>;
// };

function App() {
  return (
    <>
      <RouterProvider router={router}>
        {/* <LocationDisplay /> */}
      </RouterProvider>
    </>
  );
}

export default App;
