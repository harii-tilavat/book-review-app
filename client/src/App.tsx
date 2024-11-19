import "./App.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/ReactToastify.min.css";
import AppRouter from "./routes/AppRouter";

function App() {
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
