import { Outlet } from "react-router-dom";
import NavBar from "../components/Navbar";
const Layout = () => {
  return (
    <main className="w-full min-h-screen bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-50">
      <NavBar />
      <div className="main-content ">
        <Outlet />
      </div>
    </main>
  );
};

export default Layout;
