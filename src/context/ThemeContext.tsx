import {
  createTheme,
  PaletteMode,
  ThemeProvider as MuiThemeProvider,
} from "@mui/material/styles";
import React, { ReactNode, useEffect, useState } from "react";

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
    localStorage.getItem("themeMode") as PaletteMode
  );

  const toggleMode = () =>
    setMode((mode) => (mode === "light" ? "dark" : "light"));

  useEffect(() => {
    localStorage.setItem("themeMode", mode);
  }, [mode]);

  const themeOptions = createTheme({
    typography: {
      fontFamily: "Poppins, sans-serif",
      body1: { fontSize: 14 },
    },
    palette: {
      mode: mode === "light" ? "dark" : "light",
      primary: {
        main: "#fff",
        light: "#f2f2f3",
        dark: "#121212",
      },
      secondary: {
        main: "#000",
        light: "#7b7b7b",
      },
      error: {
        main: "#dc2626",
      },
    },
    components: {
      MuiMenuItem: {
        styleOverrides: {
          gutters: {
            fontSize: 14,
          },
        },
      },
      MuiFormControl: {
        styleOverrides: {
          root: {
            label: {
              marginBottom: 4,
            },
            ".MuiInputBase-formControl": {
              marginTop: 0,
            },
          },
        },
      },
      MuiInput: {
        styleOverrides: {
          root: {
            border: "0.5px solid #e5e7eb",
            borderRadius: "6px",
            fontSize: 14,
            "&.Mui-error": {
              ".MuiInput-input": {
                border: "1px solid #dc2626",
              },
            },
          },
        },
      },
      MuiSelect: {
        styleOverrides: {
          root: {
            ".MuiInputBase-input.MuiOutlinedInput-input": {
              border: "none",
            },
          },
        },
      },
      MuiTable: {
        styleOverrides: {
          root: {
            wordBreak: "break-word",
            overflowX: "scroll",
            tableLayout: "fixed",
            width: "100%",
            "th.MuiTableCell-head": {
              verticalAlign: "baseline",
              padding: 0,
              paddingTop: "8px",
              paddingBottom: "8px",
            },
            "td.MuiTableCell-body": {
              verticalAlign: "baseline",
              color: "#7b7b7b",
              padding: 0,
              paddingTop: "8px",
              paddingBottom: "8px",
            },
          },
        },
      },
      MuiIconButton: { defaultProps: { disableRipple: true } },
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
          },
        },
      },
      MuiButton: {
        defaultProps: {
          disableFocusRipple: true,
          disableTouchRipple: true,
          disableRipple: true,
        },
      },
    },
  });

  return (
    <ThemeContext.Provider value={{ mode, setMode, toggleMode }}>
      <MuiThemeProvider theme={themeOptions}>{children}</MuiThemeProvider>
    </ThemeContext.Provider>
  );
};
