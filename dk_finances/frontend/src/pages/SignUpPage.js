import React from 'react';
import TextField from '@mui/material/TextField'; 
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import classNames from "classnames";
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider, styled } from '@mui/material/styles';
import { makeStyles } from '@mui/material';
import { indigo } from '@mui/material/colors';
import { Container } from '@mui/system';
import { CssBaseline } from '@mui/material';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Button from '@mui/material/Button';


function SignUpPage(props){
    return(
        <Container component='main' maxWidth='xs' sx={{display: "flex"}}>
            <CssBaseline>
                <Box component='form' noValidate sx={{mt:7}}>
                    <Typography variant="h5" align="center" sx={{paddingBottom: 2}}>
                        Sign-Up
                    </Typography>
                    <Grid xs={12} sm={6}>
                        <Grid item xs={12} sm={6} sx={{paddingBottom: 2}}>
                                <TextField
                                name="nik"
                                required
                                fullWidth
                                id="nik"
                                label="NIK"
                                
                                />
                        </Grid>
                    </Grid>
                    <Grid container>
                        <Grid item xs={12} sm={6} sx={{paddingBottom: 2}}>
                            <TextField
                                name="first Name"
                                required
                                fullWidth
                                id="first Name"
                                label="FirstName"
                                autoFocus

                            />

                        </Grid>
                        <Grid item xs={12} sm={6} sx={{paddingBottom: 2, paddingLeft: 2}}>
                            <TextField
                                name="lastName"
                                required
                                fullWidth
                                id="lastName"
                                label="LastName"
                                autoFocus

                            />
                        </Grid>
                    </Grid>
                    <Grid>
                    <TextField
                        id="date"
                        label="Date-of-Birth"
                        type="date"
                        defaultValue="2000-01-01"
                        sx={{ width: "50%", paddingBottom: 2}}
                        InputLabelProps={{
                        shrink: true,
                        }}
                    />
                    </Grid>
                    <Grid container>
                        <Grid item xs={12} sm={6}>
                                <TextField
                                name="password"
                                required
                                fullWidth
                                id="password"
                                label="Password"
                                type="password"
                                
                                />
                        </Grid>
                        <Grid item xs={12} sm={6} sx={{paddingBottom: 2, paddingLeft: 2}}>
                                <TextField
                                name="repassword"
                                required
                                fullWidth
                                id="repassword"
                                label="Re-Password"
                                type="password"
                                
                                />
                        </Grid>
                    </Grid>
                    <Grid>
                        <Grid item xs={12} sx={{paddingTop: 2}}>
                        <FormControlLabel
                            control={<Checkbox value="allowExtraEmails" color="primary" />}
                            label="Sign-Up"
                            />
                        </Grid>
                    </Grid>
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        display="flex"
                        sx={{ mt: 3, mb: 2 }}
                        >
                        Sign-Up
                    </Button>
                </Box>
            </CssBaseline>
        </Container>
        
      
    )
}


export default SignUpPage;