import { Input as MuiInput, InputProps, styled } from "@mui/material";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

export const StyledInput = styled(MuiInput)(({ theme }) => {
  const { user } = useContext(AuthContext);

  const themeStyles = user
    ? {
        color:
          theme.palette.mode === "dark"
            ? theme.palette.primary.main
            : theme.palette.secondary.main,
        background:
          theme.palette.mode === "dark"
            ? "inherit"
            : theme.palette.primary.main,
        border:
          theme.palette.mode === "dark"
            ? "0.5px solid #272727"
            : "0.5px solid #e5e7eb",
      }
    : {
        color: theme.palette.secondary.main,
        background: theme.palette.primary.main,
        border: "0.5px solid #e5e7eb",
      };

  return {
    ...themeStyles,
  };
});

export const TextInput: React.FC<InputProps> = (props) => {
  return <StyledInput {...props} />;
};
