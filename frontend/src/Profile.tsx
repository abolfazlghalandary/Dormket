import React from "react";
import { Box, Grid, Button, TextField, FormControl, InputLabel, Paper, Rating, Typography } from "@mui/material";
import './index.css';
import Income from './Income';
import { ReactComponent as ProfileIcon } from './assets/profile/profile.svg';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

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
                    <Typography color="#999999" variant="h6" align="center" sx={{ m: '5' }}>
                        MohammadKhalafi@gmail.com
                    </Typography>
                    <Box
                        justifyContent="center"
                        alignItems="center"
                        sx={{ m: 2, alignItems: "center", display: "grid" }}>
                        <Rating
                            name="simple-controlled"
                            value={1}
                            size="large"
                        // onChange={(event, newValue) => {

                        // }}
                        />
                    </Box>
                </Box>
                <Box
                    display="flex"
                    justifyContent="center"
                    alignItems="center">
                    <Paper sx={{ borderRadius: 10 }}>
                        <Box sx={{ m: 4 }}>
                            <Col>
                                <Row>
                                    <Typography color="#020A9F" variant="h6">
                                        موجودی
                                    </Typography>
                                </Row>
                                <Row>
                                    <Paper elevation={3}
                                        sx={{ padding: "1rem", backgroundColor: "#020A9F" }}>
                                        <Typography color="#ffffff" variant="h5">
                                            350000 تومان
                                        </Typography>
                                    </Paper>
                                </Row>
                                <Row>
                                    <TextField id="outlined" type="number" label="مبلغ" variant="outlined" sx={{ m: 2 }} />
                                </Row>
                                <Row sx={{ alignItems: "center" }}>
                                    <Box display="flex"
                                        justifyContent="center"
                                        alignItems="center">
                                        <Button variant="outlined" sx={{ m: '1' }}>برداشت</Button>
                                        <Button variant="outlined" sx={{ m: '1' }}>شارژ</Button>
                                    </Box>
                                </Row>
                            </Col>
                        </Box>
                    </Paper>
                </Box>

            </Box>
            <Box
                sx={{ m: "20vw" }}>
                <Typography color="#000000" variant="h6" align="center">
                    درآمد روزانه (تومان) 
                </Typography>
                <Income />
            </Box>
        </>
    );
}

export default Profile;