import {
  createTheme,
  PaletteMode,
  ThemeProvider as MuiThemeProvider,
} from "@mui/material/styles";
import React, { ReactNode, useEffect, useState } from "react";
import { globalTheme, themePalette } from "../styles/globalTheme";

type ThemeContextType = {
  mode: PaletteMode;
  setMode: React.Dispatch<React.SetStateAction<PaletteMode>>;
  toggleMode: () => void;
};

export const ThemeContext = React.createContext<ThemeContextType>({
  mode: "light",
  setMode: () => {},
  toggleMode: () => {},
});

export const ThemeProvider = ({ children }: { children?: ReactNode }) => {
  const [mode, setMode] = useState<PaletteMode>(
    localStorage.getItem("themeMode") as PaletteMode,
  );

  const toggleMode = () =>
    setMode((mode) => (mode === "light" ? "dark" : "light"));

  useEffect(() => {
    localStorage.setItem("themeMode", mode);
    const root = document.documentElement;

    if (mode === "dark") {
      root.classList.remove("dark");
    } else {
      root.classList.add("dark");
    }
  }, [mode]);

  return (
    <ThemeContext.Provider value={{ mode, setMode, toggleMode }}>
      <MuiThemeProvider
        theme={(theme) =>
          createTheme({
            ...globalTheme,
            palette: {
              mode: mode === "light" ? "dark" : "light",
              ...themePalette,
            },
          })
        }
      >
        {children}
      </MuiThemeProvider>
    </ThemeContext.Provider>
  );
};
