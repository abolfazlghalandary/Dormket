import React from "react";
import { CssBaseline, ThemeProvider } from "@mui/material";
import ResponsiveAppBar from "./ResponsiveAppBar";
import { createTheme } from "@mui/material/styles";
import Main from './Main';
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