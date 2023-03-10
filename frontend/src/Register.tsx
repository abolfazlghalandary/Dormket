import React, {useState} from "react";
import {Box, Grid, Button, TextField, FormControl, InputLabel, Input, FormHelperText} from "@mui/material";
import './index.css';
import {ReactComponent as ProductIcon} from './assets/trade/Product.svg';
import axios from 'axios';
// import {redirect} from "react-router-dom";
import { Route , withRouter} from 'react-router-dom';

function act(){

}


function Register() {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password1, setPassword1] = useState('');
    const [password2, setPassword2] = useState('');


    return (
        <>
            <Grid container
                  spacing={0}
                  alignItems="center"
                  justifyContent="center">
                <FormControl>
                    <TextField id="outlined" label="نام کاربری" variant="outlined" sx={{m: 1}}
                               onChange={(event) => {
                                   setUsername(event.target.value)
                               }}/>
                    <TextField id="outlined" label="ایمیل" variant="outlined" sx={{m: 1}}
                               onChange={(event) => {
                                   setEmail(event.target.value)
                               }}/>
                    <TextField id="outlined" label="رمز عبور" variant="outlined" sx={{m: 1}}
                               onChange={(event) => {
                                   setPassword1(event.target.value)
                               }}/>
                    <TextField id="outlined" label="تکرار رمز عبور" variant="outlined" sx={{m: 1}}
                               onChange={(event) => {
                                   setPassword2(event.target.value)
                               }}/>
                    <Button variant="contained" sx={{padding: "1rem", color: "#FFFFFF", m: 1}}
                            onClick={async () => {


                                // let history = useHistory();

                                this.props.history.push('http://localhost:3001/login')


                                // let formData = new FormData();
                                //
                                // formData.append("username", username);
                                // formData.append("password1", password1);
                                // formData.append("password2", password2);
                                // formData.append("email", email);
                                //
                                // axios.post('http://127.0.0.1:8000/main/register', formData)
                                //     .then((response) => {
                                //         this.props.history.push('localhost:3001/login')
                                //
                                //     })
                                //     .catch((error) => {
                                //         alert(error.response.data);
                                //     })


                            }}>
                        ثبت‌نام
                    </Button>
                </FormControl>
                <ProductIcon style={{width: "30vw", minWidth: "8rem", display: "grid"}}/>
            </Grid>
        </>
    );
}

export default withRouter(Register);
