import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import App from "./App.tsx";
import { ThemeContextProvider } from "./context/ThemeContext.tsx";
import { ModalContextProvider } from "./context/ModalContext.tsx";
createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <ThemeContextProvider>
        <ModalContextProvider>
          <App />
        </ModalContextProvider>
      </ThemeContextProvider>
    </BrowserRouter>
  </StrictMode>
);
