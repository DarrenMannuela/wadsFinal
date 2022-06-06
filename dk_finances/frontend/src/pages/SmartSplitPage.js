import * as React from 'react';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import BudgetPieChart from '../components/BudgetPieChart';
import OpenDrawer from '../components/Drawers';
import AddCategorySmartSplit from '../components/AddCategorySmartSplit';

function SmartSplitPage(props){

    return(
        <>
            <OpenDrawer/>
            <Box maxWidth='xs' sx={{display: 'flex', flexWrap: 'wrap'}}>
                <Grid container>
                    <Grid item sx={{mr: 10, mt: "20%"}}>
                        <BudgetPieChart user_id = {11}/>

                    </Grid>
                    <Grid item sx={{ml: 10, mt: "15%"}}>
                       <AddCategorySmartSplit/>
                    </Grid>
                </Grid>
                
            </Box>
        </>
     )
    

}

export default SmartSplitPage