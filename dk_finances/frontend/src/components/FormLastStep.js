import React from 'react';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import { Container } from '@mui/system';
import { CssBaseline } from '@mui/material';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';



function FormLastStep(props){
    const navigate = useNavigate();

    const handleFormSubmission = (e) => {
        e.preventDefault();
        props.registerAccount();
        setTimeout( () => {
            props.createBalance();
            navigate('/login');
        }, 1000)
    }

    return(
        <Container component='main' maxWidth='xs' sx={{mt: '1%', display: "flex"}}>
            <CssBaseline>
                <Paper elevation={12} sx={{width: 500, height: 700, pt: 7}}>
                <Typography variant="h1" align="center" sx={{ fontSize:24, fontWeight: 600, mx: 5 }}>
                    Your account has been successfully created!
                </Typography>
                <Typography variant="h2" align="center" sx={{ mt: 5, mx: 5, fontSize:16}}>
                    Please click the button below to start going to your dashboard.
                </Typography>
                <Box component='form' sx={{ mt: 3 }} onSubmit={handleFormSubmission}>
                    <Grid sx={{ px: 15}}>
                        <Button
                            type="submission"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 2}}
                            >
                            Finish
                        </Button>
                    </Grid> 
                </Box>
                </Paper>
            </CssBaseline>
        </Container>
    )
}


export default FormLastStep;