import Box from "@mui/material/Box";
import { Link } from "react-router-dom";
import { BasicButton } from "../components/buttons";

export default function NotFound() {
  return (
    <Box
      pt={12}
      textAlign="center"
      display="flex"
      flexDirection="column"
      gap={2}
    >
      This page could not be found
      <BasicButton sx={{ alignSelf: "center" }}>
        <Link to="/">Back to Home</Link>
      </BasicButton>
    </Box>
  );
}
