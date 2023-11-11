"use client"; // This is a client component

import { Box } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";

import RegisterForm from "./components/RegisterForm";

const theme = createTheme();

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <Box
        component="main"
        display="flex"
        alignItems="center"
        justifyContent="center"
        mt={6}
        mx={2}
      >
        <RegisterForm />
      </Box>
    </ThemeProvider>
  );
}
