import Button, { ButtonProps } from "@mui/material/Button";
import { styled } from "@mui/material/styles";

const StyledBasicButton = styled(Button)({
  background: "#000",
  color: "#fff",
  borderRadius: 32,
  fontWeight: 500,
  padding: "8px 16px",
  "&:hover": {
    boxShadow: "none !important",
    opacity: 0.85,
  },
});

export const BasicButton: React.FC<ButtonProps> = (props) => {
  return <StyledBasicButton variant="contained" {...props} />;
};
