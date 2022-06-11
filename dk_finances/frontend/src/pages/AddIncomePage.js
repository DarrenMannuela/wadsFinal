import React from 'react';
import TextField from '@mui/material/TextField'; 
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import OpenDrawer from '../components/Drawers';
import BalanceTable from '../components/BalanceTable';
import { Navigate } from 'react-router-dom';

function AddIncomePage(props){
    const [income, setIncome] = React.useState(0);

    function handleIncome(event){
        setIncome(event.target.valueAsNumber);

    }
    async function updateIncome(){
        var today = new Date();
        var dd = String(today.getDate()).padStart(2, '0');
        var mm = String(today.getMonth() + 1).padStart(2, '0'); 
        var yyyy = today.getFullYear();


        today = yyyy + '-' + mm + '-' + dd;

        await fetch('api/create-income',{
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Token ${props.token}`
            },
            body: JSON.stringify({
                income: income,
                date_added: today,
                
              }),
        })
        .then((res) => {console.info(res.status);
            res.json();}).then(()=>{
                setIncome(0);
            })
        .catch((err) => console.log('error: ', err))
    }

    return(
        <body style={{display:'flex'}}>
             {!props.isLoggedIn && <Navigate to="/login" />}
            <Box component='form'  columnSpacing={3} sx={{display:'flex', mt:"10%", ml:"20%"}}>
                <Grid>
                    <OpenDrawer token={props.token}/>
                </Grid>
                <Grid container direction="row" sx={{mt:'5%', ml:'10%'}}>
                    <Grid item xs={12}>
                        <Typography variant="h5" align="center">
                        Add Income
                        </Typography>
                        
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

                        <Button
                            fullWidth
                            variant="contained"
                            display="flex"
                            sx={{ mt: 3, mb: 2 }}
                            onClick={updateIncome}
                            disabled={!income}
                            >
                            Add Income
                        </Button>
                    </Grid>
                    <Grid item xs={12} >
                        <BalanceTable token={props.token}/>
                    </Grid>
                </Grid>
            </Box>
        </body>
    )
}

export default AddIncomePage;