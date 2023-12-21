import {
  Outlet,
  useLoaderData,
  useSubmit,
  useLocation,
} from "react-router-dom";
import { useEffect } from "react";
import Header from "./../components/layout/Header/Header";
import Sidebar from "./../components/layout/Sidebar/Sidebar";
import Main from "./../components/layout/Main/Main";
import Dashboard from "./Dashboard/Dashboard";
import { getTokenDuration } from "../util/auth";

function RootLayout() {
  const location = useLocation();
  const { pathname } = location;
  const token = useLoaderData();
  const submit = useSubmit();

  useEffect(() => {
    if (!token) {
      return;
    }

    if (token === "EXPIRED") {
      submit(null, { action: "/logout", method: "post" });
    }

    const tokenDuration = getTokenDuration();

    setTimeout(() => {
      submit(null, { action: "/logout", method: "post" });
    }, tokenDuration);
  }, [token, submit]);

  return (
    <>
      <Header />
      <Sidebar />
      <Main>{pathname === "/app" ? <Dashboard /> : <Outlet />}</Main>
    </>
  );
}

export default RootLayout;
