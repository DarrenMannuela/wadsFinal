import React from 'react';
import TextField from '@mui/material/TextField'; 
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import classNames from "classnames";
import Typography from '@mui/material/Typography';
import { Container } from '@mui/system';
import { CssBaseline } from '@mui/material';
import Button from '@mui/material/Button';


function AddIncomePage(props){
    const [income, setIncome] = React.useState(0);

    function handleIncome(event){
        setIncome(event.target.valueAsNumber);
        console.info(event.target.value);

    }

    function updateIncome(){
        fetch(`api/balances/1`,{
            method: 'PATCH',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                balance: income,
              }),
            
        })
        .then((res) => {console.info(res.status);
            res.json();})
        .catch((err) => console.log('error: ', err))
    }

    return(
        <Container component='main' maxWidth='xs' sx={{display: "flex"}}>
            <CssBaseline>
                <Box component='form' noValidate sx={{mt:7}}>
                    <Typography variant="h5" align="center" sx={{paddingBottom: 2}}>
                        Add Income
                    </Typography>
                    <Grid xs={12} sm={6}>
                        <Grid item xs={12} sm={6} sx={{paddingBottom: 2, width: 500}}>
                                <TextField
                                name="income"
                                required
                                fullWidth
                                id="income"
                                label="Income"
                                type = "number"
                                onInput={handleIncome}
                                />
                        </Grid>
                    </Grid>
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        display="flex"
                        sx={{ mt: 3, mb: 2 }}
                        onClick={updateIncome}
                        >
                        Add Income
                    </Button>
                </Box>
            </CssBaseline>
        </Container>
        
      
    )
}


export default AddIncomePage;