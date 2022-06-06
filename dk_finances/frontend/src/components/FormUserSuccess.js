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
    const loginAndNext = (e) => {
        e.preventDefault();
        props.login();
        props.nextStep();
    };

    return(
        <Container component='main' maxWidth='xs' sx={{mt: '3%', display: "flex"}}>
            <CssBaseline>
                <Paper elevation={12} sx={{width: 500, height: 700, pt: 7}}>
                <Typography variant="h1" align="center" sx={{ fontSize:24, fontWeight: 600 }}>
                    User is successfully created!
                </Typography>
                <Typography variant="h2" align="center" sx={{ mt: 5, fontSize:24}}>
                    Next, we need some extra information to get your account running
                </Typography>
                <Box sx={{ mt:15 }}>
                    <Grid sx={{ px: 15}}>
                        <Button
                            fullWidth
                            variant="contained"
                            sx={{ mt: 15}}
                            onClick={loginAndNext}
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