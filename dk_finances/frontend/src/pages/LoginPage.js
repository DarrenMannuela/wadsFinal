import React from 'react';
import TextField from '@mui/material/TextField'; 
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import { Container } from '@mui/system';
import { CssBaseline } from '@mui/material';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Button from '@mui/material/Button';


function LoginPage(props){
    return(
        <Container component='main' maxWidth='xs' sx={{mt: '5%'}}>
            <CssBaseline>
                <Paper elevation={12} sx={{width: 450, height: 450, pt:2}}>
                <Typography variant="h5" align="center">
                    Login
                </Typography>
                <Box component='form' noValidate sx={{mt:7}}>
                    <Grid>
                        <Grid item xs={12} sm={6} sx={{pb: 2, px:4}}>
                            <TextField
                                name="email"
                                required
                                fullWidth
                                id="email"
                                label="Email"
                                type="email"
                                autoFocus
                          
                            />
                        </Grid>
                    </Grid>
                    <Grid>
                        <Grid item xs={12} sm={6} sx={{px:4}}>
                                <TextField
                                name="password"
                                required
                                fullWidth
                                id="password"
                                label="Password"
                                type="password"
                                
                                />
                        </Grid>
                    </Grid>
                    <Grid>
                        <Grid item xs={12} sx={{pt: 2, px: 4}}>
                        <FormControlLabel
                            control={<Checkbox value="allowExtraEmails" color="primary" />}
                            label="Login"
                            />
                        </Grid>
                    </Grid>
                    <Grid sx={{px: 6}}>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2}}
                            >
                            Login
                        </Button>
                    </Grid>
                  
                </Box>
                </Paper>
            </CssBaseline>
        </Container>
        
      
    )
}


export default LoginPage;