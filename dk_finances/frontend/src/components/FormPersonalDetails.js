import React, { useState } from 'react';
import TextField from '@mui/material/TextField'; 
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import { Container } from '@mui/system';
import { CssBaseline } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Button from '@mui/material/Button';


function FormPersonalDetails(props){
    const [value, setValue] = useState(null);

    const next = (e) => {
        e.preventDefault();
        props.nextStep();
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
                    Please input some additional details
                </Typography>
                <Box sx={{ mt: 9 }}>
                    <Grid>
                        <Grid item xs={12} sm={6} sx={{pb: 5, px:12}}>
                            <TextField
                                name="nik"
                                required
                                fullWidth
                                id="nik"
                                label="NIK"
                                type="nik"
                                value={props.nik}
                                onChange={(e) => props.setNik(e.target.value)}
                            />
                        </Grid>
                    </Grid>
                    <Grid>
                        <Grid item xs={12} sm={6} sx={{ pb: 5, px:12 }}>
                            <LocalizationProvider dateAdapter={AdapterDateFns}>
                                <DatePicker
                                name="dob"
                                disableFuture
                                label="Date of birth"
                                openTo="year"
                                views={['year', 'month', 'day']}
                                value={value}
                                onChange={(e) => {
                                    setValue(e);
                                    props.dob = value;
                                    props.setDob(props.dob);
                                }}
                                renderInput={(params) => <TextField {...params} />}
                                />
                            </LocalizationProvider>
                        </Grid>
                    </Grid>
                    <Grid sx={{ px: 15}}>
                        <Button
                            fullWidth
                            variant="contained"
                            sx={{ mt: 15}}
                            onClick={next}
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


export default FormPersonalDetails;