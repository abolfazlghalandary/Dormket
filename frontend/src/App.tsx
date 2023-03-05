import React from "react";
import { Box, CssBaseline, Paper, Typography, ThemeProvider, Button } from "@mui/material";
import ResponsiveAppBar from "./ResponsiveAppBar";
import { createTheme } from "@mui/material/styles";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Main from './Main';
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
      <Main />
    </ThemeProvider>
  );
}

export default App;