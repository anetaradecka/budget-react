import {
  Outlet,
  useLoaderData,
  useSubmit,
  useLocation,
} from "react-router-dom";
import { useEffect, useState } from "react";
import Header from "./../components/Header/Header";
import Sidebar from "../components/Sidebar/Sidebar";
import Main from "../components/Main/Main";
import Dashboard from "./Dashboard/Dashboard";
import { getTokenDuration } from "../utils/auth";
import { TitleContext } from "../store/title-context";

function RootLayout() {
  const location = useLocation();
  const { pathname } = location;
  const token = useLoaderData();
  const submit = useSubmit();
  const [pageTitle, setTitle] = useState("Dashboard");

  useEffect(() => {
    let pageTitle;
    const extractedTitle = pathname.slice(5);
    switch (extractedTitle) {
      case "":
        pageTitle = "Dashboard";
        break;
      case "transactions":
        pageTitle = "Transactions";
        break;
      default:
    }
    setTitle(pageTitle);
  }, [pathname]);

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
      <TitleContext.Provider value={{ pageTitle: pageTitle }}>
        <Header />
        <Sidebar />
        <Main>{pathname === "/app" ? <Dashboard /> : <Outlet />}</Main>
      </TitleContext.Provider>
    </>
  );
}

export default RootLayout;
