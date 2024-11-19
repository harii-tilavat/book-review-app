import { Outlet } from "react-router-dom";
import NavBar from "../components/Navbar";
const Layout = () => {
  return (
    <main>
      <NavBar />
      <div className="main-content">
        <Outlet />
      </div>
    </main>
  );
};

export default Layout;
