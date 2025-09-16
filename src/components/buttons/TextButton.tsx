import Button, { ButtonProps } from "@mui/material/Button";
import { styled } from "@mui/material/styles";

const StyledTextButton = styled(Button)({
  borderRadius: 0,
  color: "#000",
  padding: 0,
  textDecoration: "underline",
  verticalAlign: "baseline",
  "&:hover": {
    background: "transparent",
    textDecoration: "none",
  },
});

export const TextButton: React.FC<ButtonProps> = (props) => {
  return <StyledTextButton variant="text" {...props} />;
};
