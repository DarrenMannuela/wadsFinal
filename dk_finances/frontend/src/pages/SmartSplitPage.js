import * as React from 'react';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import BudgetPieChart from '../components/BudgetPieChart';
import OpenDrawer from '../components/Drawers';
import AddCategorySmartSplit from '../components/AddCategorySmartSplit';

function SmartSplitPage(props){

    return(
        <body style={{display:'flex'}}>
            <OpenDrawer/>
            <AddCategorySmartSplit/>
                
        </body>
     )
    

}

export default SmartSplitPage