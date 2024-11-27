import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import App from "./App.tsx";
import { ThemeContextProvider } from "./context/ThemeContext.tsx";
import { AuthContextProvider } from "./context/AuthContext.tsx";
import { ModalContextProvider } from "./context/ModalContext.tsx";
import BookContextProvider from "./context/BookContext.tsx";
createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <ThemeContextProvider>
        <AuthContextProvider>
          <BookContextProvider>
            <ModalContextProvider>
              <App />
            </ModalContextProvider>
          </BookContextProvider>
        </AuthContextProvider>
      </ThemeContextProvider>
    </BrowserRouter>
  </StrictMode>
);
