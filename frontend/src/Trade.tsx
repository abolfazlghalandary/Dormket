import React from "react";
import { Box, Paper, Button, Grid, TextField, Typography } from "@mui/material";
import { ReactComponent as ForgottenCode } from './assets/trade/ForgottenCode.svg';
import { ReactComponent as Sells } from './assets/trade/Sells.svg';
import { ReactComponent as Requests } from './assets/trade/Requests.svg';
import './index.css';
import OrderBook from './OrderBook';
import Product from './Product';
import ForgottenCodeTradeRequest from './ForgottenCodeTradeRequest';



function Trade() {
    return (
        <>
            <Box
                display="flex"
                justifyContent="center"
                alignItems="center"
                sx={{ m: 0 }}>
                <Box>
                    <ForgottenCode style={{ width: "15vw", margin: "2em" }} />
                    <ForgottenCodeTradeRequest />
                </Box>
                <Paper elevation={3}
                    sx={{ width: "60vw", minWidth:"30rem" }}>
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
                <Grid item sx={{ alignItems: "center" }}>
                    <Paper
                        sx={{ padding: "1rem", backgroundColor: "#E6F7FF", width: "20vw", height: "15vw", m: 4, borderRadius: 10, minWidth: "15rem", minHeight: "15rem", display: "grid" }}>
                        <Typography color="#000000" variant="h5" align="center">
                            کالای جدید
                        </Typography>
                        <TextField id="outlined" label="نام محصول" variant="outlined" sx={{ m: 1 }} />
                        <TextField id="outlined" type="number" label="قیمت" variant="outlined" sx={{ m: 1 }} />
                        <Button variant="text" sx={{ color: "#000000" }}>افزودن</Button>
                    </Paper>
                </Grid>
            </Grid >
            <Box
                display="flex"
                justifyContent="center"
                alignItems="center">
                <Requests style={{ width: "20vw" }} />
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
                <Grid item sx={{ alignItems: "center" }}>
                    <Paper
                        sx={{ padding: "1rem", backgroundColor: "#E6F7FF", width: "20vw", height: "15vw", m: 4, borderRadius: 10, minWidth: "15rem", minHeight: "15rem", display: "grid" }}>
                        <Typography color="#000000" variant="h5" align="center">
                            درخواست جدید
                        </Typography>
                        <TextField id="outlined" label="نام محصول" variant="outlined" sx={{ m: 1 }} />
                        <TextField id="outlined" type="number" label="قیمت" variant="outlined" sx={{ m: 1 }} />
                        <Button variant="text" sx={{ color: "#000000" }}>افزودن</Button>
                    </Paper>
                </Grid>
            </Grid >
        </>
    );
}

export default Trade;