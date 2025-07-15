import React, { lazy, Suspense } from "react";
import ReactDOM from "react-dom/client";
import "./styles/index.css";
import { BrowserRouter } from "react-router-dom";
import { CircularProgress, createTheme, ThemeProvider } from "@mui/material";
import { ToastContainer } from "react-toastify";
import { AuthProvider } from "./context/AuthContext";
const App = lazy(() => import("./App"));

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

const themeOptions = createTheme({
  typography: {
    fontFamily: "Poppins, sans-serif !important",
  },
});

const FallbackComponent = () => (
  <div className="place-content-center text-center fixed left-0 right-0 top-0 bottom-0">
    <CircularProgress
      sx={{
        color: document.documentElement.classList.contains("dark")
          ? "#fff"
          : "#000",
      }}
    />
  </div>
);

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <ThemeProvider theme={themeOptions}>
          <Suspense fallback={<FallbackComponent />}>
            <App />
          </Suspense>
          <ToastContainer />
        </ThemeProvider>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);
