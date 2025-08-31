import React from "react";
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
  components: {
    MuiInputBase: {
      styleOverrides: {
        root: {
          "&::before": {
            border: "none !important",
            transition: "none",
          },
          "&::after": {
            border: "none !important",
            transition: "none",
          },
          "& .MuiInputBase-input": {
            border: "1px solid #c6c6c6",
            background: "#fff",
            borderRadius: 6,
            fontSize: 14,
            fontWeight: 400,
            padding: "8px 16px",
          },
        },
      },
    },
    MuiButton: {
      defaultProps: {
        disableFocusRipple: true,
        disableTouchRipple: true,
        disableRipple: true,
      },
      styleOverrides: {
        root: {
          boxShadow: "none",
          cursor: "pointer",
          lineHeight: "normal",
          textTransform: "none",
          variants: [
            {
              props: { variant: "text" },
              style: {
                borderRadius: 0,
                fontWeight: 400,
                minWidth: "auto",
                padding: 0,
                "&:hover": {
                  background: "transparent",
                },
                verticalAlign: "baseline",
              },
            },
            {
              props: { variant: "contained" },
              style: {
                borderRadius: 32,
                padding: "8px 16px",
                fontWeight: 500,
                "&:hover": {
                  boxShadow: "none !important",
                },
              },
            },
          ],
        },
      },
    },
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
