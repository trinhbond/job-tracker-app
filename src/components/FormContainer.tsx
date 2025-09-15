import Box, { BoxProps } from "@mui/material/Box";

interface FormContainerProps extends BoxProps {
  children: React.ReactNode;
}

export const FormContainer = ({ children, ...props }: FormContainerProps) => {
  return (
    <Box
      component="form"
      display="flex"
      flexDirection="column"
      gap={2}
      {...props}
    >
      {children}
    </Box>
  );
};
