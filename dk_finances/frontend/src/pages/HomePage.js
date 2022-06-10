import * as React from 'react';
import OpenDrawer from '../components/Drawers';
import MonthlyPieChart from '../components/MonthlyPieChart';
import WeeklyBarChart from '../components/WeeklyBarChart';
import Box from '@mui/material/Box';
import { Grid } from '@mui/material';
import {Typography} from '@mui/material';
import DailyList from '../components/DailyList';
import { Navigate } from 'react-router-dom';


function HomePage(props){
    var spent = 0;
    const [dailyAmount, setDailyAmount] = React.useState(0);
    var spentSeperate = dailyAmount.toLocaleString();


    React.useEffect(()=>{fetch('api/get-history', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Token ${props.token}`
        },
      })
    .then(res=>{return res.json()})
    .then(data =>{
        const today = new Date(); 
        today.setHours(0, 0, 0, 0);
        data.map(cur =>{
            const date_bought = new Date(cur.date_bought);
            date_bought.setHours(0, 0, 0, 0);
            if(today.getTime() == date_bought.getTime()){
                spent += cur.price;
                setDailyAmount(spent);
            };
      })
    })
    }, []);
    
    return(
        <body style={{display:'flex'}}>
            {!props.isLoggedIn && <Navigate to="/login" />}
            <Box component='form' rowSpacing={2} sx={{display:'flex'}}>
                <Grid>
                    <OpenDrawer token={props.token}/>
                </Grid>
                <Grid container direction="row" sx={{mt:'5%', mr:'5%'}}>
                    <Grid item xs={6}>
                        <MonthlyPieChart token={props.token}/>
                    </Grid>
                    <Grid item xs={6}>
                        <WeeklyBarChart token={props.token}/>
                    </Grid>
                    <Grid item xs={6} sx={{mt: "3%"}}>
                        <Typography variant="h6" gutterBottom component="div">
                                        Daily Spending
                        </Typography>
                        <Typography variant="h2" component="div" gutterBottom sx={{mt:'5%'}}>
                                        Rp.{spentSeperate}
                        </Typography>
                    </Grid>
                    <Grid item xs={6} sx={{mt: "3%"}}>
                            <DailyList token={props.token}/>
                    </Grid>
                </Grid>
            </Box>
        </body>
        
    )
}

export default HomePage;