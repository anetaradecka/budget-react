import { Outlet } from "react-router-dom";
import Header from "./../components/layout/Header/Header";
import Sidebar from "./../components/layout/Sidebar/Sidebar";
import Main from "./../components/layout/Main/Main";

function RootLayout() {
  return (
    <>
      <Header />
      <Sidebar />
      <Main>
        <Outlet />
      </Main>
    </>
  );
}

export default RootLayout;
