import React, { useState } from "react";
import {render} from "react-dom";
import HomePage from "../pages/HomePage";
import LoginPage from "../pages/LoginPage";
import SignUpPage from "../pages/SignUpPage";
import SmartSplitPage from "../pages/SmartSplitPage"
import AddIncomePage from "../pages/AddIncomePage";
import {BrowserRouter as Router, Routes, Route, Link, Redirect} from "react-router-dom";


function App(props) {
        const [token, setToken] = useState(null);

        const userLogin = (e) => {
                setToken(e);
                console.log(e);
            }

        return(    
                
                <Router>
                        <Routes>
                                <Route path='/' element={<HomePage/>}></Route>
                                <Route path='/login' element={<LoginPage/>}></Route>
                                <Route path='/signup' element={<SignUpPage userLogin={userLogin} token={token}/>}></Route>
                                <Route path='/smartsplit' element={<SmartSplitPage/>}></Route>
                                <Route path='/addincome' element={<AddIncomePage/>}></Route>
                        </Routes>
                        
                </Router>
        );
}

const appDiv = document.getElementById('app');
render(<App/>, appDiv);

export default App;