import React, { useState } from "react";
import { Grid, Button, TextField, FormControl } from "@mui/material";
import './index.css';
import { ReactComponent as ProductIcon } from './assets/trade/Product.svg';

function reqLogin(formData: FormData) {
    // //     const data = await response.json();
    //     console.log("data");
}

function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    return (
        <>
            <Grid container
                spacing={0}
                alignItems="center"
                justifyContent="center">
                <FormControl>
                    <TextField id="outlined" label="نام کاربری" variant="outlined" sx={{ m: 2 }}
                        onChange={(event) => { setUsername(event.target.value) }} />
                    <TextField id="outlined" label="رمز عبور" variant="outlined" sx={{ m: 2 }}
                        onChange={(event) => { setPassword(event.target.value) }} />
                    <Button variant="contained" sx={{ padding: "1rem", color: "#FFFFFF", m: 2 }}
                        onClick={async () => {
                            const formData = new FormData();
                            formData.set('username', "username");
                            formData.set('password', "password");
                            // reqLogin(formData);
                        }}
                        >ورود</Button>
                </FormControl>
                <ProductIcon style={{ width: "30vw", minWidth: "8rem", display: "grid" }} />
            </Grid >
        </>
    );
}

export default Login;