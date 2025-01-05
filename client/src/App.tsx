import "./App.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/ReactToastify.min.css";
import AppRouter from "./routes/AppRouter";
import { useEffect } from "react";
import useBookStore from "./store/useBookStore";

function App() {
  const { getAllGenres } = useBookStore();
  useEffect(() => {
    getAllGenres();
  }, []);
  return (
    <div className="app">
      {/* Main routing */}
      <AppRouter />

      {/* Manage notification or messages */}
      <ToastContainer autoClose={1000} />
    </div>
  );
}

export default App;
