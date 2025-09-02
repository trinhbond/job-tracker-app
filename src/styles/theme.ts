import { createTheme, ThemeOptions } from "@mui/material";

declare module "@mui/material/" {
  interface Theme {
    status?: {
      error: string;
    };
  }
  interface ThemeOptions {
    status?: {
      error: string;
    };
    input?: {
      borderColor: string;
      borderRadius: number;
      margin: number;
    };
  }
}

declare module "@mui/material/styles/createMixins" {
  interface Mixins {
    input?: {
      borderColor: string;
      borderRadius: number;
    };
  }
}

export const createMuiTheme = () => {
  const theme = createTheme({
    typography: {
      fontFamily: "Poppins, sans-serif",
    },
    palette: {
      error: {
        main: "#dc2626",
      },
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

  return theme;
};
