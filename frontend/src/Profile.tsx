import React from "react";
import { Box, Grid, Button, TextField, FormControl, InputLabel, Paper, Rating, Typography } from "@mui/material";
import './index.css';
import Income from './Income';
import { ReactComponent as ProfileIcon } from './assets/profile/profile.svg';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';


const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
    },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
        border: 0,
    },
}));

const rows = [
    createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
    createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
    createData('Eclair', 262, 16.0, 24, 6.0),
    createData('Cupcake', 305, 3.7, 67, 4.3),
    createData('Gingerbread', 356, 16.0, 49, 3.9),
];

function createData(
    name: string,
    calories: number,
    fat: number,
    carbs: number,
    protein: number,
) {
    return { name, calories, fat, carbs, protein };
}

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
                sx={{ m: "10rem" }}>
                <Typography color="#000000" variant="h4" align="center">
                    درآمد روزانه (تومان)
                </Typography>
                <Income />
            </Box>
            <Paper elevation={3}
                sx={{ padding: "1rem", backgroundColor: "#020A9F" }}>
                <Typography color="#ffffff" variant="h6" align="center">
                    تبادلات اخیر
                </Typography>
            </Paper>
            <Box
                justifyContent="center"
                alignItems="center"
                sx={{ m: 4 }}>
                <Typography color="#000000" variant="h2" align="center">
                    کد فراموشی
                </Typography>
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 700 }} aria-label="customized table">
                        <TableHead>
                            <TableRow>
                                <StyledTableCell align="center">تاریخ</StyledTableCell>
                                <StyledTableCell align="center">نوع</StyledTableCell>
                                <StyledTableCell align="center">قیمت</StyledTableCell>
                                <StyledTableCell align="center">کد</StyledTableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {rows.map((row) => (
                                <StyledTableRow key={row.name}>
                                    <StyledTableCell align="center">1401/12/18</StyledTableCell>
                                    <StyledTableCell align="center">خرید</StyledTableCell>
                                    <StyledTableCell align="center">2500</StyledTableCell>
                                    <StyledTableCell align="center">421572</StyledTableCell>
                                </StyledTableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Box>
            <Box
                justifyContent="center"
                alignItems="center"
                sx={{ m: 4 }}>
                <Typography color="#000000" variant="h2" align="center">
                    فروشی‌ها
                </Typography>
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 700 }} aria-label="customized table">
                        <TableHead>
                            <TableRow>
                                <StyledTableCell align="center">تاریخ</StyledTableCell>
                                <StyledTableCell align="center">نوع</StyledTableCell>
                                <StyledTableCell align="center">قیمت</StyledTableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {rows.map((row) => (
                                <StyledTableRow key={row.name}>
                                    <StyledTableCell align="center">1401/12/18</StyledTableCell>
                                    <StyledTableCell align="center">خرید</StyledTableCell>
                                    <StyledTableCell align="center">2500</StyledTableCell>
                                </StyledTableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Box>
            <Box
                justifyContent="center"
                alignItems="center"
                sx={{ m: 4 }}>
                <Typography color="#000000" variant="h2" align="center">
                    درخواستی‌ها
                </Typography>
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 700 }} aria-label="customized table">
                        <TableHead>
                            <TableRow>
                                <StyledTableCell align="center">تاریخ</StyledTableCell>
                                <StyledTableCell align="center">نوع</StyledTableCell>
                                <StyledTableCell align="center">قیمت</StyledTableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {rows.map((row) => (
                                <StyledTableRow key={row.name}>
                                    <StyledTableCell align="center">1401/12/18</StyledTableCell>
                                    <StyledTableCell align="center">خرید</StyledTableCell>
                                    <StyledTableCell align="center">2500</StyledTableCell>
                                </StyledTableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Box>
        </>
    );
}

export default Profile;