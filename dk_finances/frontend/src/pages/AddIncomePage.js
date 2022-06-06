import React from 'react';
import TextField from '@mui/material/TextField'; 
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import classNames from "classnames";
import Typography from '@mui/material/Typography';
import { Container } from '@mui/system';
import { CssBaseline } from '@mui/material';
import Button from '@mui/material/Button';
import OpenDrawer from '../components/Drawers';

function AddIncomePage(props){
    const [income, setIncome] = React.useState(0);
    const [balance, setBalance] = React.useState(0);

    function handleIncome(event){
        setIncome(event.target.valueAsNumber);
        console.info(event.target.value);

    }

    React.useEffect(()=>{fetch('api/balances')
    .then(res=>{return res.json()})
    .then(data =>{
      data.map(cur =>{
        if(cur.user_id == 11){
            setBalance(cur.balance)
        };
      })
    })
    }, []);

    console.info(balance)

    function updateIncome(){
        fetch(`api/update-balance`,{
            method: 'PATCH',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                user_id: 11,
                balance: income+balance
              }),
            
        })
        .then((res) => {console.info(res.status);
            res.json();}).then(()=>{
                setIncome(0);
            })
        .catch((err) => console.log('error: ', err))
    }

    return(
        <Container component='main' maxWidth='xs' sx={{display: "flex"}}>
            <CssBaseline>
                <Box component='form' noValidate sx={{mt:7}}>
                    <OpenDrawer/>
                    <Typography variant="h5" align="center" sx={{paddingBottom: 2, mt:10}}>
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
                                defaultValue={0}
                                onChange={handleIncome}
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
                        disabled={!income}
                        >
                        Add Income
                    </Button>
                </Box>
            </CssBaseline>
        </Container>
        
      
    )
}


export default AddIncomePage;