import React, { useState } from 'react';
import { Link } from "react-router-dom";
import TextField from '@mui/material/TextField'; 
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import { Container } from '@mui/system';
import { CssBaseline } from '@mui/material';
import Button from '@mui/material/Button';


function LoginPage(props){

    const [username, setUsername] = useState(null);
    const [password, setPassword] = useState(null);

    const handleLogin = (e) => {
        e.preventDefault();
        const user = { username, password };
        fetch('http://127.0.0.1:8000/auth', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(user)
        })
        .then((data) => data.json())
        .then((data) => {
            console.log(data.token);
            }
        )
        .catch((error) => console.error(error))
    }

    return(
        <Container component='main' maxWidth='xs' sx={{mt: '3%', display: "flex"}}>
            <CssBaseline>
            <Paper elevation={12} sx={{width: 700, height: 700, pt: 7}}>
            <Typography variant="h1" align="center" sx={{ fontSize:24, fontWeight: 600 }}>
                    Login
                </Typography>
                <Box component='form' noValidate sx={{ mt:15 }} onSubmit={handleLogin}>
                    <Grid>
                        <Grid item xs={12} sm={6} sx={{pb: 5, px: 12}}>
                            <TextField
                                name="username"
                                required
                                fullWidth
                                id="username"
                                label="Username"
                                type="username"
                                autoFocus
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                            />
                        </Grid>
                    </Grid>
                    <Grid>
                        <Grid item xs={12} sm={6} sx={{ pb: 5, px: 12 }}>
                                <TextField
                                name="password"
                                required
                                fullWidth
                                id="password"
                                label="Password"
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                />
                        </Grid>
                    </Grid>
                    {/* <Grid>
                        <Grid item xs={12} sx={{pt: 2, px: 4}}>
                        <FormControlLabel
                            control={<Checkbox value="allowExtraEmails" color="primary" />}
                            label="Login"
                            />
                        </Grid>
                    </Grid> */}
                    <Grid sx={{ px: 15}}>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 10, mb: 1}}
                            >
                            Login
                        </Button>
                    </Grid> 
                    <Grid sx={{ px: 15}}>
                        <Link to="/signup" style={{ textDecoration: 'none' }}>
                            <Button
                                fullWidth
                                variant="outlined"
                                sx={{ mt: 1, mb: 2}}
                                >
                                Sign up
                            </Button>
                        </Link>
                    </Grid>  
                </Box>
                </Paper>
            </CssBaseline>
        </Container>
        
      
    )
}


export default LoginPage;