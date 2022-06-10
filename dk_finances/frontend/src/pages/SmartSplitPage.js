import * as React from 'react';
import OpenDrawer from '../components/Drawers';
import AddCategorySmartSplit from '../components/AddCategorySmartSplit';
import { Navigate } from 'react-router-dom';

function SmartSplitPage(props){
    console.log(props.token)

    return(
        <body style={{display:'flex'}}>
            {!props.isLoggedIn && <Navigate to="/login" />}
            <OpenDrawer token={props.token}/>
            <AddCategorySmartSplit token={props.token}/>
        </body>
     )
    

}

export default SmartSplitPage