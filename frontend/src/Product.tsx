import React from "react";
import { Button, Paper, Typography, Grid } from "@mui/material";
import { ReactComponent as ProductIcon } from './assets/trade/Product.svg';
import './index.css';


function Product(props) {
    return (
        <Grid item sx={{ alignItems:"center" }}>
            <Paper
                sx={{ padding: "1rem", backgroundColor: "#E6F7FF", width: "20vw", height: "15vw", m: 4, borderRadius: 10, minWidth: "15rem", minHeight: "15rem", display:"grid" }}>
                <Typography color="#000000" variant="h6" align="center">
                    {props.title}
                </Typography>
                <ProductIcon style={{ width: "10vw", minWidth: "8rem", margin: "auto" }}/>
                <Button variant="outlined">{props.price} تومان</Button>
            </Paper>
        </Grid>
    )
}

export default Product;