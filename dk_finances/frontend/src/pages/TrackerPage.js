import * as React from 'react';
import OpenDrawer from '../components/Drawers';
import { Container } from '@mui/system';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import TrackerTable from '../components/TrackerTable';
import { Navigate } from 'react-router-dom';

function TrackerPage(props){

    return(
        <div>
            {!props.isLoggedIn && <Navigate to="/login" />}
            <OpenDrawer token={props.token}/>
            <Container component='main' maxWidth='xs' sx={{display: "flex"}}>
                <Box component='form' noValidate sx={{mt:7}}>
                    <Paper elevation={12} sx={{width: 800, height: 200, mt:3, mx:"30%"}}>
                        <TrackerTable token={props.token}/>
                    </Paper>
                </Box>
            </Container>
        </div>
       
        )

}


export default TrackerPage;