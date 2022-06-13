import * as React from 'react';
import OpenDrawer from '../components/Drawers';
import AddCategorySmartSplit from '../components/AddCategorySmartSplit';
import { useNavigate, Navigate } from 'react-router-dom';

function SmartSplitPage(props){
    const navigate = useNavigate();
    console.log(props.token)

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
        <body style={{display:'flex'}}>
            <OpenDrawer token={props.token} logout={logout} />
            <AddCategorySmartSplit token={props.token}/>
        </body>
     )
    

}

export default SmartSplitPage