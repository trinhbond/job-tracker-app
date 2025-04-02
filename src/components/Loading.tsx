import { CircularProgress, CircularProgressProps } from "@mui/material";

interface LoadingProps extends CircularProgressProps {
  theme: string | null;
}

export default function Loading({ theme }: LoadingProps) {
  return (
    <CircularProgress
      sx={{
        color: theme === "dark" ? "#fff" : "#000",
      }}
    />
  );
}
