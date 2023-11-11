import { Alert, Box } from "@mui/material";

const SuccessMessage = ({ name }) => {
  return (
    <Alert severity="success" p={4}>
      <Box fontSize={16}>
        <strong>{name}</strong>
        <p>Thank you for applying to this useful government service</p>
      </Box>
    </Alert>
  );
};

export default SuccessMessage;
