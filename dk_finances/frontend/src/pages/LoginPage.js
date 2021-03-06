import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import TextField from '@mui/material/TextField'; 
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Alert from '@mui/material/Alert';
import { Container } from '@mui/system';
import { CssBaseline } from '@mui/material';
import Button from '@mui/material/Button';
import { useNavigate, Navigate } from 'react-router';



function LoginPage(props){
    const userList = [];
    const [usernameQuery, setUsernameQuery] = useState([]);
    const [username, setUsername] = useState(null);
    const [password, setPassword] = useState(null);
    const [rightCredential, setRightCredential] = useState(true);
    const navigate = useNavigate();

    useEffect( () => {
        const token = localStorage.getItem("token");
        if (token) {
          props.userLogin(token);
          navigate('/');
        }
      }, []);

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

    const handleLogin = async(e) => {
        e.preventDefault();
        const user = { username, password };
        await fetch('auth', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(user)
        })
        .then((data) => data.json())
        .then((data) => {
            // console.log(data);
            if (data.token) {
                localStorage.setItem('token', data.token)
                setRightCredential(true);
                props.userLogin(data.token);
                navigate('/');
            } else {
                setRightCredential(false);
            }
        })
        .catch((error) => console.error(error))
    }

    return(
        <Container component='main' maxWidth='xs' sx={{mt: '1%', display: "flex"}}>
            <CssBaseline>
            <Paper elevation={12} sx={{width: 500, height: 700, pt: 7}}>
            <Typography variant="h1" align="center" sx={{ fontSize:24, fontWeight: 600 }}>
                    Login
            </Typography>
            {!rightCredential && <Alert severity='error' sx={{ mt: 4, mx: 10 }}>Incorrect credentials!</Alert>}
                <Box component='form' noValidate sx={{ mt:8 }} onSubmit={handleLogin}>
                    <Grid>
                        <Grid item xs={12} sm={6} sx={{pb: 5, px: 12}}>
                            <TextField
                                name="username"
                                required
                                fullWidth
                                id="username"
                                label="Username"
                                type="username"
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