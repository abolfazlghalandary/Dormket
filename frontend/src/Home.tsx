import React from "react";
import { Box, CssBaseline, Paper, Typography, ThemeProvider, Button } from "@mui/material";
import ResponsiveAppBar from "./ResponsiveAppBar";
import { createTheme } from "@mui/material/styles";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { ReactComponent as Bed } from './assets/landing images/SVG/Bed.svg';
import './index.css';


function Home() {
    return (
        <>
            <Box
                display="flex"
                justifyContent="center"
                alignItems="center">
                <Box sx={{ m: 4 }}>
                    <Col>
                        <Row>
                            <Typography color="#020A9F" variant="h1">
                                بازار
                            </Typography>
                        </Row>
                        <Row>
                            <Paper elevation={3}
                                sx={{ padding: "1rem", backgroundColor: "#020A9F" }}>
                                <Typography color="#ffffff" variant="h1">
                                    تبادلات
                                </Typography>
                            </Paper>
                        </Row>
                        <Row>
                            <Typography color="#020A9F" variant="h1">
                                خوابگاهی
                            </Typography>
                        </Row>
                    </Col>
                </Box>
                <Bed style={{ width: "80em" }} />
            </Box>

            <Box
                display="flex"
                justifyContent="center"
                alignItems="center">
                <Button variant="contained" sx={{ padding: "1rem", color: "#FFFFFF" }}>شروع خرید و فروش</Button>
                <Button variant="outlined" sx={{ padding: "1rem", m: 2 }}>ثبت نام</Button>
            </Box>

            <Box
                display="flex"
                justifyContent="center"
                alignItems="center">
                <Box sx={{ m: 4 }}>
                    <Paper
                        sx={{ padding: "1rem", backgroundColor: "#FD4077", width: "20vw", height: "15vw", m: 4 }}>
                        <Typography color="#ffffff" variant="h6" align="center">
                            +500
                            <br />
                            کاربر فعال
                        </Typography>
                    </Paper>
                </Box>
                <Box sx={{ m: 4 }}>
                    <Paper
                        sx={{ padding: "1rem", backgroundColor: "#FD4077", width: "20vw", height: "15vw", m: 4 }}>
                        <Typography color="#ffffff" variant="h6" align="center">
                            +15000
                            <br />
                            ثبت سفارش
                        </Typography>
                    </Paper>
                </Box>
                <Box sx={{ m: 4 }} >
                    <Paper
                        sx={{ padding: "1rem", backgroundColor: "#FD4077", width: "20vw", height: "15vw", m: 4 }}>
                        <Typography color="#ffffff" variant="h6" align="center">
                            +17
                            <br />
                            میلیون تومان گردش مالی
                        </Typography>
                    </Paper>
                </Box>
            </Box>
        </>
    );
}

export default Home;