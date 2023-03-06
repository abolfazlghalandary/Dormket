import React from "react";
import { Box, Grid, Button, TextField, FormControl, InputLabel, Input, Rating, Typography } from "@mui/material";
import './index.css';
import Income from './Income';
import { ReactComponent as ProfileIcon } from './assets/profile/profile.svg';


function Profile() {
    return (
        <>
            <Box
                display="flex"
                justifyContent="center"
                alignItems="center"
                sx={{ m: 4 }}>
                <ProfileIcon style={{ width: "20vw", height: "20vw" }} />
                <Box
                    justifyContent="center"
                    alignItems="center"
                    sx={{ m: 4 }}>
                    <Typography color="#000000" variant="h2" align="center">
                        محمد خلفی
                    </Typography>
                    <Rating
                        name="simple-controlled"
                        value={1}
                        size="large"
                    // onChange={(event, newValue) => {

                    // }}
                    />
                </Box>
            </Box>
            <Income />
        </>
    );
}

export default Profile;