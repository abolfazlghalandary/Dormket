import React from "react";
import { Box, CssBaseline, Paper, Typography, ThemeProvider } from "@mui/material";
import ResponsiveAppBar from "./ResponsiveAppBar";
import { createTheme } from "@mui/material/styles";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

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
        contrastText: "#000000",
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
        <Container fluid>
          <Col>
            <Row>
              <Typography color="#020A9F" variant="h1">
                بازار
              </Typography>
            </Row>
            <Row>
              <Paper elevation={3}
                sx={{ padding: "1rem", backgroundColor: "#020A9F" }}>
                <Typography color="#ffffff" variant="h1">
                  تبادلات
                </Typography>
              </Paper>
            </Row>
            <Row>
              <Typography color="#020A9F" variant="h1">
                خوابگاهی
              </Typography>
            </Row>
          </Col>
        </Container>
      </Box>
    </ThemeProvider>
  );
}

export default App;