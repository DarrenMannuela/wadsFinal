import React, { useState } from 'react';
import TextField from '@mui/material/TextField'; 
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import { Container } from '@mui/system';
import { CssBaseline } from '@mui/material';
import Button from '@mui/material/Button';



function FormCredentials(props){
    const registerAndNext = (e) => {
        e.preventDefault();
        props.registerUser();
        props.nextStep();
    };

    return(
        <Container component='main' maxWidth='xs' sx={{mt: '3%', display: "flex"}}>
            <CssBaseline>
                <Paper elevation={12} sx={{width: 500, height: 700, pt: 7}}>
                <Typography variant="h1" align="center" sx={{ fontSize:24, fontWeight: 600 }}>
                    User Creation
                </Typography>
                <Box component='form' sx={{ mt:15 }} onSubmit={registerAndNext}>
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
                                onChange={(e) => props.setUsername(e.target.value)}
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
                    {/* <Grid>
                        <Grid item xs={12} sm={6} sx={{ px:12 }}>
                                <TextField
                                name="re-password"
                                required
                                fullWidth
                                id="re-password"
                                label="Re-Password"
                                type="password"
                                />
                        </Grid>
                    </Grid> */}
                    <Grid sx={{ px: 15}}>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 15}}
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