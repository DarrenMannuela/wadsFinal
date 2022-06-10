import React, { useState } from 'react';
import TextField from '@mui/material/TextField'; 
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import { Container } from '@mui/system';
import { CssBaseline } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Button from '@mui/material/Button';


function FormBalanceCreation(props){
    const min = 0;

    const back = (e) => {
        e.preventDefault();
        props.prevStep();
    };

    const handleFormSubmission = (e) => {
        e.preventDefault();
        props.registerUser();
        setTimeout(() => {
            props.login();
            props.nextStep();
        }, 1000)
    }

    const theme = createTheme({
        palette: {
          neutral: {
            main: '#64748B',
            contrastText: '#fff',
          },
        },
      });

    return(
        <Container component='main' maxWidth='xs' sx={{mt: '1%', display: "flex"}}>
            <CssBaseline>
                <Paper elevation={12} sx={{width: 500, height: 700, pt: 7}}>
                <Typography variant="h1" align="center" sx={{ fontSize:24, fontWeight: 600, mx: 5 }}>
                    Almost done!
                </Typography>
                <Typography variant="h2" align="center" sx={{ mt: 5, mx: 5, fontSize:16}}>
                    Please input the balance you want to start with.
                </Typography>
                <Box component='form' sx={{ mt: 3 }} onSubmit={handleFormSubmission}>
                    <Grid>
                        <Grid item xs={12} sm={6} sx={{pb: 5, px:12}}>
                            <TextField
                            name="balance"
                            required
                            fullWidth
                            id="balance"
                            label="Balance"
                            type="number"
                            inputProps={{ min }}
                            value={props.balance}
                            onChange={(e) => {
                                if (e.target.value === "") {
                                props.setBalance(e.target.value);
                                return;
                                }
                                const balance = +e.target.value;
                                if (balance < min) {
                                props.setBalance(min);
                                } else {
                                props.setBalance(balance);
                                }
                            }}
                            />
                        </Grid>
                    </Grid>
                    <Grid sx={{ px: 15}}>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 2}}
                            >
                            Continue
                        </Button>
                    </Grid>
                    <Grid sx={{ px: 15}}>
                        <ThemeProvider theme={theme}>
                            <Button
                                fullWidth
                                color="neutral"
                                variant="contained"
                                sx={{ mt: 2}}
                                onClick={back}
                                >
                                Back
                            </Button>
                        </ThemeProvider>
                    </Grid> 
                </Box>
                </Paper>
            </CssBaseline>
        </Container>
    )
}


export default FormBalanceCreation;