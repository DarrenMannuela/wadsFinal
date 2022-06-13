import React, { useState, useEffect } from 'react';
import FormCredentials from '../components/FormCredentials';
import FormPersonalDetails from '../components/FormPersonalDetails';
import FormBudgetSplits from '../components/FormBudgetSplits';
import FormBalanceCreation from '../components/FormBalanceCreation';
import FormLastStep from '../components/FormLastStep';
import { NodefluxAuth, NodefluxOcrKtp } from '../components/Nodeflux';
import { useNavigate } from 'react-router-dom';


function SignUpPage(props) {
    const [step, setStep] = useState(1);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [first_name, setFirstName] = useState("");
    const [last_name, setLastName] = useState("");
    const [nik, setNik] = useState("");
    const [dob, setDob] = useState("");
    const [needs_split, setNeeds] = useState(0);
    const [wants_split, setWants] = useState(0);
    const [savings_split, setSavings] = useState(0);
    const [balance, setBalance] = useState(0);
    const [invalidFileType, setInvalidFileType] = useState(false);
    const [nodefluxLoad, setNodefluxLoad] = useState(false);

    // put here if something goes wrong again

    // const [file, setFile] = useState(null);
    // const [base64URL, setBase64URL] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            props.userLogin(token);
            navigate('/');
        }
    }, []);

    // put here the other thing if it broke again

    const user = { username, password, first_name, last_name }
    const userAuth = { username, password }
    const account = { nik, dob, needs_split, wants_split, savings_split }
    const accountBalance = { balance }

    const nextStep = () => {
        setStep(step + 1);
    };

    const prevStep = () => {
        setStep(step - 1);
    };

    const registerUser = async (e) => {
        await fetch('api/users/', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
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
            headers: { 'Content-Type': 'application/json' },
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

    const createBalance = async (e) => {
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

    const toBase64 = (file) => new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = (error) => reject(error);
    });

    // const handleFileInputChange = async(e) => {
    //     const file = e.target.files[0];
    //     console.log(await toBase64(file));
    // }

    const delayTask = delay_amount_ms =>
        new Promise(resolve => setTimeout(() => resolve("delay"), delay_amount_ms))

    const handleNodefluxKtpOcr = async (e) => {
        const file = e.target.files[0];
        if (!file){
            return;
        }
        if (file.type !== 'image/jpeg') {
            setInvalidFileType(true);
            return;
        }
        const imageBase64 = await toBase64(file);
        const nodeflux_auth = await NodefluxAuth();
        let result, status;
        setNodefluxLoad(true);
        while (['success', 'incompleted'].includes(status) !== true) {
            result = await NodefluxOcrKtp({
                "authentication": nodeflux_auth.authentication,
                "timestamp": nodeflux_auth.timestamp
            }, imageBase64);
            status = result.response.job.result.status;
            const data = result.response.job.result.result;
            if (status == 'success') {
                setNodefluxLoad(false);
                const name = data[0].nama.split(" ");
                let capitalized_name = [];
                   
                // var date = new Date(data[0].tanggal_lahir);
                // var dd = String(date.getDate()).padStart(2, '0');
                // var mm = String(date.getMonth() + 1).padStart(2, '0'); 
                // var yyyy = date.getFullYear();

                // date = yyyy + '-' + mm + '-' + dd;
                
                name.forEach(word => {
                    let converted;
                    converted = word.toLowerCase();
                    converted = converted[0].toUpperCase() + converted.slice(1);
                    capitalized_name.push(converted);
                })
                // console.log(name)
                setFirstName(capitalized_name[0]);
                setLastName(capitalized_name[capitalized_name.length-1]);
                setNik(data[0].nik);
                // setDob(date);
                let date_2 = data[0].tanggal_lahir
                date_2 = date_2.split("-")
                date_2 = `${date_2[2]}-${date_2[1]}-${date_2[0]}`
                console.log(date_2)
                // setDob(data[0].tanggal_lahir);
                // console.log(new Date(date_2))
                // setDob(new Date(date_2))
                setDob(date_2)

                // console.log(name)
                console.log(new Date(data[0].tanggal_lahir))
               

            }
            // console.log(status)
            // console.log(raw)
            delayTask(1500) // delay the task for 1 second (it's in ms)
        }
    }

    switch (step) {
        case 1:
            return (
                <FormCredentials
                    nextStep={nextStep}
                    setUsername={setUsername}
                    setPassword={setPassword}
                    username={username}
                    password={password}
                />
            );
        case 2:
            return (
                <FormPersonalDetails
                    handleNodefluxKtpOcr={handleNodefluxKtpOcr}
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
                    nodefluxLoad={nodefluxLoad}
                    invalidFileType={invalidFileType}
                />
            );
        case 3:
            return (
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
            return (
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
            return (
                <FormLastStep
                    registerAccount={registerAccount}
                    createBalance={createBalance}
                />
            )
    };
}

export default SignUpPage;