import * as React from 'react';
import OpenDrawer from '../components/Drawers';
import { Container } from '@mui/system';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import TrackerTable from '../components/TrackerTable';
import { useNavigate, Navigate } from 'react-router-dom';

function TrackerPage(props){
    const navigate = useNavigate();

    React.useEffect( () => {
        const token = localStorage.getItem("token");
        if (token) {
            props.userLogin(token);
        } else {
            navigate('/login');
        }
      }, []);

    const logout = () => {
        props.userLogout();
        navigate('/login');
    }

    return(
        <div>
            <OpenDrawer token={props.token} logout={logout} />
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