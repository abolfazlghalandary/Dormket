import React from "react";
import { Box, CssBaseline, Paper, Typography, ThemeProvider, Button } from "@mui/material";
import ResponsiveAppBar from "./ResponsiveAppBar";
import { createTheme } from "@mui/material/styles";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { ReactComponent as ForgottenCode } from './assets/trade/ForgottenCode.svg';
import './index.css';
import OrderBook from './OrderBook';



function Trade() {
    return (
        <>
            <Box
                display="flex"
                justifyContent="center"
                alignItems="center"
                sx={{ m: 4 }}>
                <ForgottenCode style={{ width: "20vw", margin: "4em" }} />
                <Paper elevation={3}
                    sx={{ width: "50vw" }}>
                    <OrderBook />
                </Paper>
            </Box>
        </>
    );
}

export default Trade;