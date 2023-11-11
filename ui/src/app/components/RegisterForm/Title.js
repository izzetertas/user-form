import { Box } from "@mui/material";

const Title = ({ status }) => (
  <Box
    component="h1"
    fontSize={[24, 28]}
    display="flex"
    justifyContent="center"
    mb={2}
  >
    {status === "success"
      ? "Application Complete"
      : "Some Useful Government Service"}
  </Box>
);

export default Title;
