import React, { useState } from 'react';
import FormCredentials from '../components/FormCredentials';
import FormPersonalDetails from '../components/FormPersonalDetails';
import FormBudgetSplits from '../components/FormBudgetSplits';
import FormBalanceCreation from '../components/FormBalanceCreation';
import FormLastStep from '../components/FormLastStep';


function SignUpPage(props){
    const [step, setStep] = useState(1);
    const [username, setUsername] = useState(null);
    const [password, setPassword] = useState(null);
    const [first_name, setFirstName] = useState(null);
    const [last_name, setLastName] = useState(null);
    const [nik, setNik] = useState(null);
    const [dob, setDob] = useState(null);
    const [needs_split, setNeeds] = useState(0);
    const [wants_split, setWants] = useState(0);
    const [savings_split, setSavings] = useState(0);
    const [balance, setBalance] = useState(0);

    const user = {username, password, first_name, last_name}
    const userAuth = {username, password}
    const account = {nik, dob, needs_split, wants_split, savings_split}
    const accountBalance = {balance}

    const nextStep = () => {
        setStep(step+1);
    };

    const prevStep = () => {
        setStep(step-1);
    };

    const registerUser = async (e) => {
        await fetch('api/users/', {
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

    const login = async (e) => {
        await fetch('auth', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(userAuth)
        }).then((data) => data.json())
        .then((data) => {
            props.userLogin(data.token);
            }
        )
        .catch((error) => console.error(error))
    }

    const registerAccount = async (e) => {
        await fetch('api/create-account', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Token ${props.token}`
            },
            body: JSON.stringify(account)
        }).then(() => {
            console.log('Account info added');
        })
        .catch((error) => console.error(error))
    }

    const createBalance = async(e) => {
        await fetch('api/create-balance', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Token ${props.token}`
            },
            body: JSON.stringify(accountBalance)
        }).then(() => {
            console.log('Balance created');
        })
        .catch((error) => console.error(error))
    }

    // const logout = () => {
    //     props.userLogout();
    // }

    switch (step) {
        case 1:
            return(
                <FormCredentials
                    nextStep={nextStep}
                    setUsername={setUsername}
                    setPassword={setPassword}
                    username={username}
                    password={password}
                />
            );
        case 2:
            return(
                <FormPersonalDetails
                    nextStep={nextStep}
                    prevStep={prevStep}
                    setFirstName={setFirstName}
                    setLastName={setLastName}
                    setNik={setNik}
                    setDob={setDob}
                    first_name={first_name}
                    last_name={last_name}
                    nik={nik}
                    dob={dob}
                />
            );
        case 3:
            return(
                <FormBudgetSplits
                    nextStep={nextStep}
                    prevStep={prevStep}
                    setNeeds={setNeeds}
                    setWants={setWants}
                    setSavings={setSavings}
                    needs_split={needs_split}
                    wants_split={wants_split}
                    savings_split={savings_split}
                />
            );
        case 4:
            return(
                <FormBalanceCreation
                    nextStep={nextStep}
                    prevStep={prevStep}
                    registerUser={registerUser}
                    login={login}
                    setBalance={setBalance}
                    balance={balance}
                />
            );
        case 5:
            return(
                <FormLastStep
                registerAccount={registerAccount}
                createBalance={createBalance}
                />
            )
    };
}

export default SignUpPage;