import React, { Component, useState } from 'react';
import FormCredentials from '../components/FormCredentials'
import FormUserSuccess from '../components/FormUserSuccess'
import FormPersonalDetails from '../components/FormPersonalDetails'
import FormBudgetSplits from '../components/FormBudgetSplits';
import { Link } from "react-router-dom";
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';


function SignUpPage(props){
    const [step, setStep] = useState(1);
    const [username, setUsername] = useState(null);
    const [password, setPassword] = useState(null);
    const [nik, setNik] = useState(null);
    const [dob, setDob] = useState(null);
    const [needs_split, setNeeds] = useState(0);
    const [wants_split, setWants] = useState(0);
    const [savings_split, setSavings] = useState(0);

    const user = {username, password}
    const account = {nik, dob, needs_split, wants_split, savings_split}

    const nextStep = () => {
        setStep(step+1);
    };

    const prevStep = () => {
        setStep(step-1);
    };

    const registerUser = (e) => {
        fetch('http://127.0.0.1:8000/api/users/', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(user)
        }).then((data) => data.json())
        .then((data) => {
                console.log('User added')
            }
        )
        .catch((error) => console.error(error))
    }

    const registerAccount = (e) => {
        fetch('http://127.0.0.1:8000/api/create-account', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Token ${props.token}'
            },
            body: JSON.stringify(account)
        }).then(() => {
            console.log('Account info added');
            console.log(props.token)
        })
        .catch((error) => console.error(error))
    }

    const login = (e) => {
        fetch('http://127.0.0.1:8000/auth', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(user)
        }).then((data) => data.json())
        .then((data) => {
            props.userLogin(data.token);
            }
        )
        .catch((error) => console.error(error))
    }

    switch (step) {
        case 1:
            return(
                <FormCredentials
                    nextStep={nextStep}
                    registerUser={registerUser}
                    setUsername={setUsername}
                    setPassword={setPassword}
                    username={username}
                    password={password}
                />
            );
        case 2:
            return(
                <FormUserSuccess
                    nextStep={nextStep}
                    login={login}
                />
            );
        case 3:
            return(
                <FormPersonalDetails
                    nextStep={nextStep}
                    setNik={setNik}
                    setDob={setDob}
                    nik={nik}
                    dob={dob}
                />
            );
        case 4:
            return(
                <FormBudgetSplits
                    nextStep={nextStep}
                    prevStep={prevStep}
                    registerAccount={registerAccount}
                    setNeeds={setNeeds}
                    setWants={setWants}
                    setSavings={setSavings}
                    needs_split={needs_split}
                    wants_split={wants_split}
                    savings_split={savings_split}
                />
            );
        case 5:
            return(
                <Container component='main' maxWidth='xs' sx={{mt: '3%', display: "flex"}}>
                    <Stack spacing={10}>
                        <Typography variant="h1" align="center" sx={{ fontSize:90, fontWeight: 600 }}>
                                Success!
                        </Typography>
                        <Typography variant="h4" align="center" sx={{ fontSize:20 }}>
                                Click <Link to={"/login"} >here</Link> to go back to the login page
                        </Typography>
                    </Stack>
                </Container>
            )
    };
}

export default SignUpPage;