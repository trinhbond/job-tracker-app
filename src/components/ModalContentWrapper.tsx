import Box, { BoxProps } from "@mui/material/Box";
import { styled } from "@mui/material/styles";
import React from "react";

interface ModalContentWrapperProps extends BoxProps {
  children: React.ReactNode;
}

const ModalContentWrapperStyled = styled(Box)({
  background: "#fff",
  height: "100%",
  overflowY: "scroll",
  position: "fixed",
  right: 0,
  top: 0,
  zIndex: 40,
});

export const ModalContentWrapper = React.forwardRef<
  HTMLDivElement,
  ModalContentWrapperProps
>(({ children, ...props }, ref) => (
  <ModalContentWrapperStyled {...props} ref={ref}>
    {children}
  </ModalContentWrapperStyled>
));
