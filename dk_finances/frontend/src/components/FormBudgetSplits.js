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


function FormBudgetSplits(props){
    const min = 0;

    const registerAccountAndNext = (e) => {
        e.preventDefault();
        props.registerAccount();
        props.nextStep();
    };

    const back = (e) => {
        e.preventDefault();
        props.prevStep();
    };

    const theme = createTheme({
        palette: {
          neutral: {
            main: '#64748B',
            contrastText: '#fff',
          },
        },
      });

    return(
        <Container component='main' maxWidth='xs' sx={{mt: '3%', display: "flex"}}>
            <CssBaseline>
                <Paper elevation={12} sx={{width: 500, height: 700, pt: 7}}>
                <Typography variant="h1" align="center" sx={{ fontSize:24, fontWeight: 600 }}>
                    Account Creation
                </Typography>
                <Typography variant="h2" align="center" sx={{ mt: 5, fontSize:12}}>
                    Please input the percentage of your budget you desire for each category
                </Typography>
                <Box component='form' sx={{ mt: 9 }} onSubmit={registerAccountAndNext}>
                    <Grid>
                        <Grid item xs={12} sm={6} sx={{pb: 5, px:12}}>
                            <TextField
                            name="needs_split"
                            required
                            fullWidth
                            id="needs_split"
                            label="Needs"
                            type="number"
                            inputProps={{ min }}
                            value={props.needs_split}
                            onChange={(e) => {
                                if (e.target.value === "") {
                                props.setNeeds(e.target.value);
                                return;
                                }
                                const needs_split = +e.target.value;
                                if (needs_split < min) {
                                props.setNeeds(min);
                                } else {
                                props.setNeeds(needs_split);
                                }
                            }}
                            />
                        </Grid>
                    </Grid>
                    <Grid>
                        <Grid item xs={12} sm={6} sx={{ pb: 5, px:12 }}>
                            <TextField
                                name="wants_split"
                                required
                                fullWidth
                                id="wants_split"
                                label="Wants"
                                type="number"
                                inputProps={{ min }}
                                value={props.wants_split}
                                onChange={(e) => {
                                    if (e.target.value === "") {
                                    props.setWants(e.target.value);
                                    return;
                                    }
                                    const wants_split = +e.target.value;
                                    if (wants_split < min) {
                                    props.setWants(min);
                                    } else {
                                    props.setWants(wants_split);
                                    }
                                }}
                            />
                        </Grid>
                    </Grid>
                    <Grid>
                        <Grid item xs={12} sm={6} sx={{ pb: 5, px:12 }}>
                            <TextField
                                name="savings_split"
                                required
                                fullWidth
                                id="savings_split"
                                label="Savings"
                                type="number"
                                inputProps={{ min }}
                                value={props.savings_split}
                                onChange={(e) => {
                                    if (e.target.value === "") {
                                    props.setSavings(e.target.value);
                                    return;
                                    }
                                    const savings_split = +e.target.value;
                                    if (savings_split < min) {
                                    props.setSavings(min);
                                    } else {
                                    props.setSavings(savings_split);
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
                            sx={{ mt: 5}}
                            >
                            Finish
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


export default FormBudgetSplits;