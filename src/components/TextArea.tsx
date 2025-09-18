import React from "react";
import TextareaAutosize, {
  TextareaAutosizeProps,
} from "@mui/material/TextareaAutosize";

export const TextArea = React.forwardRef<
  HTMLTextAreaElement,
  TextareaAutosizeProps
>(({ ...props }, ref) => <TextareaAutosize ref={ref} {...props} />);
