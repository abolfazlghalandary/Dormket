import React from "react";
import { Box, Grid, Button, TextField, FormControl, InputLabel, Input, FormHelperText } from "@mui/material";
import './index.css';
import { ReactComponent as ProductIcon } from './assets/trade/Product.svg';


function Login() {
    return (
        <>
            <Grid container
                spacing={0}
                alignItems="center"
                justifyContent="center">
                <FormControl>
                    <TextField id="outlined" label="نام کاربری" variant="outlined" sx={{ m: 2 }} />
                    <TextField id="outlined" label="رمز عبور" variant="outlined" sx={{ m: 2 }} />
                    <Button variant="contained" sx={{ padding: "1rem", color: "#FFFFFF", m: 2 }}>ورود</Button>
                </FormControl>
                <ProductIcon style={{ width: "30vw", minWidth: "8rem", display: "grid" }} />
            </Grid >
        </>
    );
}

export default Login;