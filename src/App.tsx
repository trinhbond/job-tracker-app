import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import { lazy, Suspense } from "react";
import { AuthProvider } from "./context/AuthContext";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Fallback } from "./components/Fallback";
import { Applications, Dashboard } from "./pages";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { createTheme, ThemeProvider } from "@mui/material";
import { globalTheme, themePalette } from "./styles/globalTheme";

const Layout = lazy(() => import("./components/Layout"));
const Home = lazy(() => import("./pages/Home"));

export default function App() {
  return (
    <Suspense fallback={<Fallback />}>
      <ThemeProvider
        theme={createTheme({
          ...globalTheme,
          palette: {
            ...themePalette,
          },
        })}
      >
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <AuthProvider>
            <Router>
              <Routes>
                <Route path="/" index element={<Home />} />
                <Route element={<Layout />}>
                  <Route path="applications" element={<Applications />} />
                  <Route path="dashboard" element={<Dashboard />} />
                  <Route path="*" element={<Navigate to="/" replace />} />
                </Route>
              </Routes>
            </Router>
          </AuthProvider>
        </LocalizationProvider>
        <ToastContainer limit={10} />
      </ThemeProvider>
    </Suspense>
  );
}
