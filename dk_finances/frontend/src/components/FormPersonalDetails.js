import React, { useState, useEffect } from 'react';
import TextField from '@mui/material/TextField'; 
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { styled } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Alert from '@mui/material/Alert';
import { Container } from '@mui/system';
import { CssBaseline } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import LoadingButton from '@mui/lab/LoadingButton';
import Button from '@mui/material/Button';
import moment from "moment";

const Input = styled('input')({
    display: 'none',
  });


function FormPersonalDetails(props){
    const nikList = [];
    const [value, setValue] = useState(new Date(""));
    const [accountQuery, setAccountQuery] = useState([]);
    const [nikExist, setNikExist] = useState(false);

    useEffect( () => {
        if (props.dob == ""){
            setValue(new Date(""));
        } else {
            setValue(new Date(props.dob));
        }
    }, [props.dob])

    useEffect(() => {
        fetch('api/account')
        .then( (res) => {
            return res.json();
        })
        .then( (data) => {
            setAccountQuery(data);
        })
        .catch( (err) => {
            console.log(err);
        });
    }, []);

    accountQuery.map((item) => {
        nikList.push(item.nik);
    })

    const prev = (e) => {
        e.preventDefault();
        props.prevStep();
    };

    const handleDateChange = (newValue) => {
        setValue(newValue);
        let formattedDate = moment(newValue).format('YYYY-MM-DD');
        props.setDob(formattedDate);
      };

    const handleNikFieldChange = (e) => {
        const re = /^[0-9\b]+$/;
        if (e.target.value === '' || re.test(e.target.value)) {
            props.setNik(e.target.value)
        }
    };

    const handleFormSubmission = (e) => {
        e.preventDefault();
        if (nikList.includes(props.nik)) {
            setNikExist(true);
        } else {
            setNikExist(false);
            props.nextStep();
        }
    };

    const theme = createTheme({
        palette: {
          neutral: {
            main: '#64748B',
            contrastText: '#fff',
          },
          nodeflux: {
            main: '#4C12A1',
            contrastText: '#fff',
          },
        },
      });

    return(
        <Container component='main' maxWidth='xs' sx={{mt: '1%', display: "flex"}}>
            <CssBaseline>
                <Paper elevation={12} sx={{width: 500, height: 800, pt: 7}}>
                <Typography variant="h1" align="center" sx={{ fontSize:24, fontWeight: 600, mx: 5 }}>
                    Let us get to know you more!
                </Typography>
                <Typography variant="h2" align="center" sx={{ mt: 5, mx: 5, fontSize:16}}>
                    Please input some personal details about yourself, or use Nodeflux to scan your KTP.
                </Typography>
                {nikExist && <Alert severity='error' sx={{ mt: 2, mx: 10 }}>The provided NIK already exists</Alert>}
                {props.invalidFileType && <Alert severity='error' sx={{ mt: 2, mx: 10 }}>Please only upload JPEG images.</Alert>}
                <Box component='form' sx={{ mt:3 }} onSubmit={handleFormSubmission}>
                    <Grid>
                        <Grid item xs={12} sm={6} sx={{pb: 2, px:12}}>
                            <TextField
                                name="nik"
                                required
                                fullWidth
                                id="nik"
                                label="NIK"
                                type="nik"
                                value={props.nik}
                                onChange={handleNikFieldChange}
                            />
                        </Grid>
                    </Grid>
                    <Grid>
                        <Grid item xs={12} sm={6} sx={{pb: 2, px:12}}>
                            <TextField
                                name="first_name"
                                required
                                fullWidth
                                id="first_name"
                                label="First Name"
                                value={props.first_name}
                                onChange={(e) => props.setFirstName(e.target.value)}
                            />
                        </Grid>
                    </Grid>
                    <Grid>
                        <Grid item xs={12} sm={6} sx={{pb: 2, px:12}}>
                            <TextField
                                name="last_name"
                                required
                                fullWidth
                                id="last_name"
                                label="Last Name"
                                value={props.last_name}
                                onChange={(e) => props.setLastName(e.target.value)}
                            />
                        </Grid>
                    </Grid>
                    <Grid>
                        <Grid item xs={12} sm={6} sx={{ pb: 2, px:12 }}>
                            <LocalizationProvider dateAdapter={AdapterDateFns}>
                                <DatePicker
                                name="dob"
                                inputFormat="yyyy-MM-dd"
                                mask="____-__-__"
                                disableFuture
                                label="Date of birth"
                                value={value}
                                onChange={handleDateChange}
                                renderInput={(params) => <TextField {...params} />}
                                />
                            </LocalizationProvider>
                        </Grid>
                    </Grid>
                    <Grid sx={{ px: 15}}>
                        {!props.nodefluxLoad && <label htmlFor="nodeflux-button">
                            <Input accept="image/jpeg" id="nodeflux-button" multiple type="file" onChange={props.handleNodefluxKtpOcr} />
                            <ThemeProvider theme={theme}>
                                <Button
                                    fullWidth
                                    color="nodeflux"
                                    variant="contained"
                                    component="span"
                                    sx={{ mt: 2}}
                                    >
                                    Nodeflux
                                </Button>
                            </ThemeProvider>
                        </label>}
                        {props.nodefluxLoad && <LoadingButton 
                            loading variant="outlined"
                            fullWidth
                            sx={{ mt: 2 }}
                            >
                            Nodeflux
                        </LoadingButton>}
                        {/* <label htmlFor="contained-button-file">
                            <Input accept="image/*" id="contained-button-file" multiple type="file" />
                            <Button variant="contained" component="span">
                            Upload
                            </Button>
                        </label> */}
                    </Grid>
                    <Grid sx={{ px: 15}}>
                        <Button
                            type="submit"
                            fullWidth
                            disabled={props.nodefluxLoad}
                            variant="contained"
                            sx={{ mt: 5}}
                            >
                            Continue
                        </Button>
                    </Grid>
                    <Grid sx={{ px: 15}}>
                        <ThemeProvider theme={theme}>
                            <Button
                                fullWidth
                                disabled={props.nodefluxLoad}
                                color="neutral"
                                variant="contained"
                                sx={{ mt: 2}}
                                onClick={prev}
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


export default FormPersonalDetails;