import "./App.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/ReactToastify.min.css";
import AppRouter from "./routes/AppRouter";
import useBookApi from "./hooks/useBookApi";
import { useEffect } from "react";

function App() {
  const { getAllGenres } = useBookApi();

  useEffect(() => {
    getAllGenres();
  }, []);
  return (
    <div className="app">
      {/* Main routing */}
      <AppRouter />

      {/* Manage notification or messages */}
      <ToastContainer />
    </div>
  );
}

export default App;
