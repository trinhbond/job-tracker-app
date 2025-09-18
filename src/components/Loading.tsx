import { CircularProgress, CircularProgressProps } from "@mui/material";

interface LoadingProps extends CircularProgressProps {
  theme?: string | null;
}

export const Loading: React.FC<LoadingProps> = ({ theme, ...props }) => (
  <CircularProgress
    sx={{
      color: theme === "dark" ? "#fff" : "#000",
    }}
    {...props}
  />
);
