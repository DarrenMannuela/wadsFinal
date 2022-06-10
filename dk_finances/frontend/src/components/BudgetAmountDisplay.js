import * as React from 'react';
import {Typography} from '@mui/material';
import Paper from '@mui/material/Paper';


function BudgetAmountDisplay(props){
    //Returns the budget spent on the current day
    return(
        <Paper elevation={6} sx={{ display: "flex", alignItems: "baseline", width: 300, height: 50, ml: 3, mt: 2, alignItems:"center", justifyContent:"center"}}>
            <Typography variant="h6" noWrap gutterBottom component="div" sx={{width:"30%", ml: "15%", mt: "5%"}}>
                {props.needWant}
            </Typography>
            <Typography variant="h6" noWrap gutterBottom component="div" sx={{width:"70%", ml: "1%", mt: "5%"}}>
                {props.subCategory}
            </Typography>
        </Paper>
    )

}

export default BudgetAmountDisplay;