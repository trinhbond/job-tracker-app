import { styled } from "@mui/material/styles";
import { TextareaHTMLAttributes } from "react";

const BasicTextArea = styled("textarea")({
  border: "1px solid #e5e7eb",
  borderRadius: 6,
  minHeight: "150px",
  padding: "8px 16px",
  resize: "none",
  "&:focus": {
    outline: "none",
  },
});

export const TextArea: React.FC<TextareaHTMLAttributes<HTMLTextAreaElement>> = (
  props
) => <BasicTextArea {...props} />;
