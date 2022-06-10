import React, { useState } from 'react';
import TextField from '@mui/material/TextField'; 
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Alert from '@mui/material/Alert';
import { Container } from '@mui/system';
import { CssBaseline } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Button from '@mui/material/Button';


function FormBudgetSplits(props){
    const min = 0;
    const [total100, setTotal100] = useState(true);

    const back = (e) => {
        e.preventDefault();
        props.prevStep();
    };

    const handleFormSubmission = (e) => {
        e.preventDefault();
        if (props.needs_split + props.wants_split + props.savings_split == 100) {
            props.nextStep();
        } else {
            setTotal100(false);
        }
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
                    Setting your budget allocation.
                </Typography>
                <Typography variant="h2" align="center" sx={{ mt: 5, mx: 5, fontSize:16}}>
                    Please input the percentage of your budget you desire for each category and make sure the fields add up to 100.
                </Typography>
                {!total100 && <Alert severity='error' sx={{ mt: 2, mx: 10 }}>The fields should all sum up to 100.</Alert>}
                <Box component='form' sx={{ mt: 3 }} onSubmit={handleFormSubmission}>
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


export default FormBudgetSplits;