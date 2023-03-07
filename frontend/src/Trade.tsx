import React from "react";
import { Box, Paper, Button, Grid } from "@mui/material";
import { ReactComponent as ForgottenCode } from './assets/trade/ForgottenCode.svg';
import { ReactComponent as Sells } from './assets/trade/Sells.svg';
import { ReactComponent as Requests } from './assets/trade/Requests.svg';
import './index.css';
import OrderBook from './OrderBook';
import Product from './Product';



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
            <Box
                display="flex"
                justifyContent="center"
                alignItems="center">
                <Sells style={{ width: "20vw" }} />
            </Box >
            <Grid container
                spacing={0}
                alignItems="center"
                justifyContent="center">
                <Product title="پنیر روزانه" price="33000" type="food" />
                <Product title="پنیر روزانه" price="33000" type="food" />
                <Product title="پنیر روزانه" price="33000" type="food" />
                <Product title="پنیر روزانه" price="33000" type="food" />
                <Product title="پنیر روزانه" price="33000" type="food" />
                <Product title="پنیر روزانه" price="33000" type="food" />
            </Grid >
            <Box
                display="flex"
                justifyContent="center"
                alignItems="center">
                <Requests style={{ width: "20vw" }} />
            </Box >
        </>
    );
}

export default Trade;