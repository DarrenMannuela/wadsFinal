import * as React from 'react';
import OpenDrawer from '../components/Drawers';
import MonthlyPieChart from '../components/MonthlyPieChart';
import WeeklyBarChart from '../components/WeeklyBarChart';
import Box from '@mui/material/Box';

import { Grid } from '@mui/material';
import { Container } from '@mui/system';
import {Typography} from '@mui/material';
import DailyList from '../components/DailyList';


function HomePage(props){
    var spent = 0;
    const [dailyAmount, setDailyAmount] = React.useState(0);
    var spentSeperate = dailyAmount.toLocaleString();


    React.useEffect(()=>{fetch('api/history')
    .then(res=>{return res.json()})
    .then(data =>{
        const today = new Date(); 
        today.setHours(0, 0, 0, 0);
        data.map(cur =>{
            const date_bought = new Date(cur.date_bought);
            date_bought.setHours(0, 0, 0, 0);
            if(cur.user_id == 11 && today.getTime() == date_bought.getTime()){
                spent += cur.price;
                setDailyAmount(spent);
            };
      })
    })
    }, []);

    

    


    return(
        <body>
        <div>
            <OpenDrawer/>
            <Container component='main' maxWidth='xs' sx={{display: "flex"}}>
            <Box>
                <Grid>
                    <div>
                        <div style={{display:'flex', marginTop: 35}}>
                            <div  style={{display:'flex', marginTop: 35, marginLeft: '15%'}}>
                                <MonthlyPieChart user_id={11}/>

                            </div>
                            <div style={{display:'flex', marginTop: 35, marginLeft: '15%'}}>
                                <WeeklyBarChart user_id={11}/>
                            </div>
                        </div> 
                    </div>
                </Grid>
                <Grid>
                    <div>
                        <div style={{display:'flex', marginTop: '10%', marginLeft: '15%'}}>
                            <div>
                                <Typography variant="h6" gutterBottom component="div">
                                    Daily Spending
                                </Typography>
                                <Typography variant="h2" component="div" gutterBottom sx={{marginTop:'5%'}}>
                                    Rp.{spentSeperate}
                                </Typography>
                            </div>
                            <div style={{marginLeft:'35%', marginBottom:'5%'}}>
                                    <DailyList/>

                            </div>
                        </div>
                    </div>                
                    
                </Grid>

            </Box>
            </Container>  

        </div>
        </body>
        
    )
}

export default HomePage;