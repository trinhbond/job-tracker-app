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
  padding: 16,
  position: "fixed",
  right: 0,
  top: 0,
  zIndex: 40,
});

export const ModalContentWrapper: React.FC<ModalContentWrapperProps> = ({
  children,
  ...props
}) => {
  return (
    <ModalContentWrapperStyled {...props}>{children}</ModalContentWrapperStyled>
  );
};
