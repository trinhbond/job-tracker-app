import Box, { BoxProps } from "@mui/material/Box";
import { styled } from "@mui/material/styles";
import React from "react";

interface ModalContentWrapperProps extends BoxProps {
  children: React.ReactNode;
}

export const ModalContentWrapperStyled = styled(Box)(({ theme }) => {
  const themeStyles =
    theme.palette.mode === "dark"
      ? theme.palette.primary.dark
      : theme.palette.primary.light;

  return {
    background: themeStyles,
    height: "100%",
    overflowY: "scroll",
    padding: 16,
    position: "fixed",
    right: 0,
    top: 0,
    zIndex: 40,
  };
});

export const ModalContentWrapper = React.forwardRef<
  HTMLDivElement,
  ModalContentWrapperProps
>(({ children, ...props }, ref) => (
  <ModalContentWrapperStyled {...props} ref={ref}>
    {children}
  </ModalContentWrapperStyled>
));
