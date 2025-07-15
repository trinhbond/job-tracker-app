import React, { lazy, Suspense } from "react";
import ReactDOM from "react-dom/client";
import "./styles/index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { createTheme, ThemeProvider } from "@mui/material";
import { ToastContainer } from "react-toastify";
import { AuthProvider } from "./context/AuthContext";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

const themeOptions = createTheme({
  typography: {
    fontFamily: "Poppins, sans-serif !important",
  },
});

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <ThemeProvider theme={themeOptions}>
          <App />
          <ToastContainer />
        </ThemeProvider>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);
