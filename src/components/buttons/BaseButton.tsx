import Button, { ButtonProps } from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";

export const StyledBaseButton = styled(Button)(({ theme }) => {
  const { user } = useContext(AuthContext);

  const themeStyles = user
    ? {
        background:
          theme.palette.mode === "dark"
            ? theme.palette.primary.main
            : theme.palette.secondary.main,
        color:
          theme.palette.mode === "dark"
            ? theme.palette.secondary.main
            : theme.palette.primary.main,
      }
    : {
        background: theme.palette.secondary.main,
        color: theme.palette.primary.main,
      };

  return {
    ...themeStyles,
    borderRadius: 32,
    padding: "8px 16px",
    "&:hover": {
      boxShadow: "none",
      opacity: 0.85,
    },
  };
});

export const BaseButton: React.FC<ButtonProps> = (props) => {
  return <StyledBaseButton variant="contained" {...props} />;
};
