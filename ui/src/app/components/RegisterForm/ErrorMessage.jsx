import { Alert } from "@mui/material";

const ErrorMessage = ({ message }) => {
  return (
    <Alert sx={{ mt: 3 }} severity="error" variant="filled">
      {message}
    </Alert>
  );
};

export default ErrorMessage;
