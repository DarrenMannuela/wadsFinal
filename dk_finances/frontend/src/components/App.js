import React, { useState } from "react";
import {render} from "react-dom";
import HomePage from "../pages/HomePage";
import LoginPage from "../pages/LoginPage";
import SignUpPage from "../pages/SignUpPage";
import SmartSplitPage from "../pages/SmartSplitPage";
import TrackerPage from "../pages/TrackerPage";
import AddIncomePage from "../pages/AddIncomePage";
import {BrowserRouter as Router, Routes, Route } from "react-router-dom";


function App(props) {
        const [token, setToken] = useState("");
        const [isLoggedIn, setIsLoggedIn] = useState(false);

        const userLogin = (e) => {
                setToken(e);
                setIsLoggedIn(true);
            }

        const userLogout = () => {
                setToken("");
                setIsLoggedIn(false);
        }

        return(    
                <Router>
                        <Routes>
                                <Route path='/' element={<HomePage isLoggedIn={isLoggedIn} token={token}/>}></Route>
                                <Route path='/login' element={<LoginPage userLogin={userLogin} />}></Route>
                                <Route path='/signup' element={<SignUpPage userLogin={userLogin} token={token}/>}></Route>
                                <Route path='/smartsplit' element={<SmartSplitPage isLoggedIn={isLoggedIn} token={token}/>}></Route>
                                <Route path='/tracker' element={<TrackerPage isLoggedIn={isLoggedIn} token={token}/>}></Route>
                                <Route path='/addincome' element={<AddIncomePage isLoggedIn={isLoggedIn} token={token}/>}></Route>
                        </Routes>
                        
                </Router>
        );
}

const appDiv = document.getElementById('app');
render(<App/>, appDiv);

export default App;