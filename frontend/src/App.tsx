import React from "react";
import { Box, CssBaseline, Paper, Typography, ThemeProvider } from "@mui/material";
import ResponsiveAppBar from "./ResponsiveAppBar";
import { createTheme } from "@mui/material/styles";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { ReactComponent as Bed } from './assets/landing images/SVG/Bed.svg';
import './index.css';


function App() {
  const theme = createTheme({
    typography: {
      fontFamily: [
        '"Vazir"',
      ].join(','),
    },
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
        display="flex"
        justifyContent="center"
        alignItems="center">
        <Box sx={{ m: 4 }}>
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
        </Box>
        <Bed style={{ width: "80em" }} />
      </Box>

      <Container>
        <Row>
          <Col>
            <Paper
              sx={{ padding: "1rem", backgroundColor: "#FD4077" }}>
              <Typography color="#ffffff" variant="h6">
                +500 کاربر فعال
              </Typography>
            </Paper>
          </Col>
          <Col>
            <Paper
              sx={{ padding: "1rem", backgroundColor: "#FD4077" }}>
              <Typography color="#ffffff" variant="h6">
                +15000 ثبت سفارش
              </Typography>
            </Paper>
          </Col>
          <Col>
            <Paper
              sx={{ padding: "1rem", backgroundColor: "#FD4077" }}>
              <Typography color="#ffffff" variant="h6">
                +17 میلیون تومان گردش مالی
              </Typography>
            </Paper>
          </Col>
        </Row>
      </Container>

      <Container>
        <Row>
          <Col>
            <Paper
              sx={{ padding: "1rem", backgroundColor: "#FD4077" }}>
              <Typography color="#ffffff" variant="h6">
                +500 کاربر فعال
              </Typography>
            </Paper>
          </Col>
          <Col>
            <Paper
              sx={{ padding: "1rem", backgroundColor: "#FD4077" }}>
              <Typography color="#ffffff" variant="h6">
                +15000 ثبت سفارش
              </Typography>
            </Paper>
          </Col>
          <Col>
            <Paper
              sx={{ padding: "1rem", backgroundColor: "#FD4077" }}>
              <Typography color="#ffffff" variant="h6">
                +17 میلیون تومان گردش مالی
              </Typography>
            </Paper>
          </Col>
        </Row>
      </Container>
    </ThemeProvider>
  );
}

export default App;