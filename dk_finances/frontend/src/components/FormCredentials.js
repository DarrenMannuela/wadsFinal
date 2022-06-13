import React, { useState, useEffect } from 'react';
import TextField from '@mui/material/TextField'; 
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Alert from '@mui/material/Alert';
import { Container } from '@mui/system';
import { CssBaseline } from '@mui/material';
import Button from '@mui/material/Button';



function FormCredentials(props){
    var re = /^\w+$/;
    const userList = [];
    const [usernameQuery, setUsernameQuery] = useState([]);
    const [usernameValidChar, setUsernameValidChar] = useState(true);
    const [usernameValidLength, setUsernameValidLength] = useState(true);
    const [userExist, setUserExist] = useState(false);
    const [passwordValidLength, setPasswordValidLength] = useState(true);
    const [rePassword, setRePassword] = useState("");
    const [passwordMatch, setPasswordMatch] = useState(true);

    useEffect(() => {
        fetch('api/users')
        .then( (res) => {
            return res.json();
        })
        .then( (data) => {
            setUsernameQuery(data);
        })
        .catch( (err) => {
            console.log(err);
        });
    }, []);

    usernameQuery.map((item) => {
        userList.push(item.username);
    })

    const handleFormSubmission = (e) => {
        e.preventDefault();
        if (props.username.length < 6) {
            setUsernameValidLength(false);
            setUsernameValidChar(true);
            setUserExist(false);
            setPasswordValidLength(true);
            setPasswordMatch(true);
        } else if (!re.test(props.username)) {
            setUsernameValidChar(false);
            setUsernameValidLength(true);
            setUserExist(false);
            setPasswordValidLength(true);
            setPasswordMatch(true);
        } else if (userList.includes(props.username)) {
            setUserExist(true);
            setUsernameValidLength(true);
            setUsernameValidChar(true);
            setPasswordValidLength(true);
            setPasswordMatch(true);
        } else if (props.password.length < 8) {
            setPasswordValidLength(false);
            setPasswordMatch(true);
            setUsernameValidLength(true);
            setUsernameValidChar(true);
            setUserExist(false);
        } else if (props.password != rePassword) {
            setPasswordMatch(false);
            setPasswordValidLength(true);
            setUsernameValidLength(true);
            setUsernameValidChar(true);
            setUserExist(false);
        } else {
            setUsernameValidLength(true);
            setUsernameValidChar(true);
            setUserExist(false);
            setPasswordValidLength(true);
            setPasswordMatch(true);
            props.nextStep();
        }
    }

    return(
        <Container component='main' maxWidth='xs' sx={{mt: '1%', display: "flex"}}>
            <CssBaseline>
                <Paper elevation={12} sx={{width: 500, height: 700, pt: 7}}>
                <Typography variant="h1" align="center" sx={{ fontSize:24, fontWeight: 600, mx: 5 }}>
                    Let's start by making your credentials!
                </Typography>
                {!usernameValidLength && <Alert severity='error' sx={{ mt: 2, mx: 10 }}>Username needs to be more than 6 characters.</Alert>}
                {!usernameValidChar && <Alert severity='error' sx={{ mt: 2, mx: 10 }}>Username can only contain alphanumeric characters and "_" (underscore).</Alert>}
                {userExist && <Alert severity='error' sx={{ mt: 2, mx: 10 }}>Username already exists!</Alert>}
                {!passwordValidLength && <Alert severity='error' sx={{ mt: 2, mx: 10 }}>Password needs to be more than 8 characters.</Alert>}
                {!passwordMatch && <Alert severity='error' sx={{ mt: 2, mx: 10 }}>Passwords do not match!</Alert>}
                <Box component='form' sx={{ mt:8 }} onSubmit={handleFormSubmission}>
                    <Grid>
                        <Grid item xs={12} sm={6} sx={{pb: 5, px:12}}>
                            <TextField
                                name="username"
                                required
                                fullWidth
                                id="username"
                                label="Username"
                                type="username"
                                value={props.username}
                                onChange={(e) => {props.setUsername(e.target.value);}}
                            />
                        </Grid>
                    </Grid>
                    <Grid>
                        <Grid item xs={12} sm={6} sx={{ pb: 5, px:12 }}>
                                <TextField
                                name="password"
                                required
                                fullWidth
                                id="password"
                                label="Password"
                                type="password"
                                value={props.password}
                                onChange={(e) => props.setPassword(e.target.value)}
                                />
                        </Grid>
                    </Grid>
                    <Grid>
                        <Grid item xs={12} sm={6} sx={{ px:12 }}>
                                <TextField
                                name="re-password"
                                required
                                fullWidth
                                id="re-password"
                                label="Re-Password"
                                type="password"
                                value={rePassword}
                                onChange={(e) => setRePassword(e.target.value)}
                                />
                        </Grid>
                    </Grid>
                    <Grid sx={{ px: 15}}>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 10}}
                            >
                            Continue
                        </Button>
                    </Grid> 
                </Box>
                </Paper>
            </CssBaseline>
        </Container>
    )
}


export default FormCredentials;