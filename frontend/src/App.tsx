import React from "react";
import { Box, CssBaseline, Paper, Typography, ThemeProvider } from "@mui/material";
import ResponsiveAppBar from "./ResponsiveAppBar";
import { createTheme } from "@mui/material/styles";

function App() {
    // define theme
    const theme = createTheme({
      palette: {
        primary: {
          light: "#0042AD",
          main: "#0042AD",
          dark: "#80a1d6",
          contrastText: "#001d83",
        },
        secondary: {
          main: "#FD4077",
          light: "#82e9de",
          dark: "#00867d",
          contrastText: "#000",
        },
      },
    });
  
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <ResponsiveAppBar />
      <Box
        height="100vh"
        display="flex"
        justifyContent="center"
        alignItems="center"
        flexDirection="column"
      >
        <Paper
          elevation={3}
          sx={{ padding: "1rem", backgroundColor: "secondary.light" }}
        >
          <Typography color="primary.dark" variant="h1">
            Starter App
          </Typography>
        </Paper>
      </Box>
    </ThemeProvider>
  );
}

export default App;