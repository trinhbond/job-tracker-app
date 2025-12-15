import Button, { ButtonProps } from "@mui/material/Button";
import { styled } from "@mui/material/styles";

const StyledTextButton = styled(Button)(({ theme }) => ({
  borderRadius: 0,
  color:
    theme.palette.mode === "dark"
      ? theme.palette.primary.main
      : theme.palette.secondary.main,
  padding: 0,
  textDecoration: "underline",
  verticalAlign: "baseline",
  "&:hover": {
    background: "transparent",
    textDecoration: "none",
  },
}));

export const TextButton: React.FC<ButtonProps> = (props) => {
  return <StyledTextButton variant="text" {...props} />;
};
