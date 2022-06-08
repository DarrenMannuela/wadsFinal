import * as React from 'react';
import OpenDrawer from '../components/Drawers';
import { Container } from '@mui/system';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import { Grid } from '@mui/material';
import {Typography} from '@mui/material';
import TrackerTable from '../components/TrackerTable';

function TrackerPage(props){

    return(
        <div>
            <OpenDrawer/>
            <Container component='main' maxWidth='xs' sx={{display: "flex"}}>
                <Box component='form' noValidate sx={{mt:7}}>
                    <Paper elevation={12} sx={{width: 800, height: 200, mt:3, mx:"30%"}}>
                        <TrackerTable user_id={11}/>
                    </Paper>
                </Box>
            </Container>
        </div>
       
        )

}


export default TrackerPage;