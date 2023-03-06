import React, { useEffect, useState } from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';


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

function createData(
    name: string,
    calories: number,
    fat: number,
    carbs: number,
    protein: number,
) {
    return { name, calories, fat, carbs, protein };
}

const rows = [
    createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
    createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
    createData('Eclair', 262, 16.0, 24, 6.0),
    createData('Cupcake', 305, 3.7, 67, 4.3),
    createData('Gingerbread', 356, 16.0, 49, 3.9),
];

let buyBright = false
function BuyOrder(props) {
    buyBright = !buyBright
    return <StyledTableCell align="center" style={{ backgroundColor: buyBright ? "#4ADD73" : "#4ADD73" }}>{props.val}</StyledTableCell>
}

let sellBright = false
function SellOrder(props) {
    sellBright = !sellBright
    return <StyledTableCell align="center" style={{ backgroundColor: sellBright ? "#E56161" : "#E56161" }}>{props.val}</StyledTableCell>
}

export default function OrderBook() {
    // const [orders, setOrders] = useState({})

    // const allOrders = async (e) => {
    //     e.preventDefault()
    //     const options = {
    //         url: 'localhost:8000/api/search',
    //         method: 'POST',
    //         headers: {
    //             Accept: 'application/json',
    //             'Content-Type': 'application/json;charset=UTF-8',
    //         },
    //         data,
    //     }

    //     axios(options)
    //         .then((response) => {
    //             console.log(response.data.data) // THIS RETURNS OBJECT DATA GOTTEN FROM THE SERVER AFTER POST REQUEST

    //             setOffers(response.data.data) //IT DOES NOT UPDATE WITH RESPONSE DATA
    //             console.log(offers)
    //         })
    //         .catch(function (error) {
    //             if (error.response) {
    //                 setValerr(error.response.data.errors)
    //                 console.log(error.response)
    //             }
    //         })
    // }

    // useEffect(() => {
    //     // This should log offers to the console if it has been set
    //     if (offers) {
    //         console.log(offers)
    //     }
    // }, [offers])

    return (
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 700 }} aria-label="customized table">
                <TableHead>
                    <TableRow>
                        <StyledTableCell align="center">حجم</StyledTableCell>
                        <StyledTableCell align="center">قیمت</StyledTableCell>
                        <StyledTableCell align="center">قیمت</StyledTableCell>
                        <StyledTableCell align="center">حجم</StyledTableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows.map((row) => (
                        <StyledTableRow key={row.name}>
                            <BuyOrder val="10" />
                            <BuyOrder val="10" />
                            <SellOrder val="10" />
                            <SellOrder val="10" />
                        </StyledTableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}