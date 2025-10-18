import Box from "@mui/material/Box";
import { Loading } from "./Loading";

export const Fallback = () => (
  <Box
    sx={{
      bottom: 0,
      left: 0,
      position: "fixed",
      placeContent: "center",
      right: 0,
      textAlign: "center",
      top: 0,
    }}
  >
    <Loading />
  </Box>
);
