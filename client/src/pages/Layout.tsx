import { Outlet } from "react-router-dom";
import NavBar from "../components/Navbar";
import Footer from "../components/Footer";
const Layout = () => {
  return (
    <main className="w-full min-h-screen bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-50">
      <NavBar />
      <div className="main-content pt-16">
        <Outlet />
      </div>
      <Footer />
    </main>
  );
};

export default Layout;
