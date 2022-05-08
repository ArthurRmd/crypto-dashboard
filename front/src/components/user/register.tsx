import React, {useState} from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import {UserService} from '../../services/user_service';
import {RegisterPayloadDo} from '../../models/do/register';
import {Navigate} from "react-router-dom";
import {useDispatch} from 'react-redux'
import {login, logout} from '../../state/loginSlice';
import {ProfileProps, purge, update} from "../../state/profileSlice";

export interface RegisterProps {
    userService: UserService;
}

export default function RegisterForm({userService}: RegisterProps) {

    const loginDispatcher = useDispatch();
    const profileDispatcher = useDispatch();

    const [isRegistrationComplete, setRegistrationComplete] = useState(false);

    // Form fields
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');


    function handleChangeName(event: React.ChangeEvent<HTMLInputElement>) {
        setName(event.target.value);
    }

    function handleChangeEmail(event: React.ChangeEvent<HTMLInputElement>) {
        setEmail(event.target.value);
    }

    function handleChangePassword(event: React.ChangeEvent<HTMLInputElement>) {
        setPassword(event.target.value);
    }

    function handleChangeConfirmPassword(event: React.ChangeEvent<HTMLInputElement>) {
        setConfirmPassword(event.target.value);
    }

    function handleRegistration() {
        if (password === confirmPassword) {
            const payload = new RegisterPayloadDo(name, email, password);
            userService.register(payload)
                .then((response) => {
                    setRegistrationComplete(true);
                    loginDispatcher(login());
                    const data = response.getData();
                    profileDispatcher(update(new ProfileProps(data.name, data.email)));
                })
                .catch((_error) => {
                    setRegistrationComplete(false);
                    setPassword('');
                    setConfirmPassword('');
                    loginDispatcher(logout());
                    profileDispatcher(purge());
                });
        }
    }

    const formTemplate = (
        <Box
            component="form"
            sx={{
                '& .MuiTextField-root': {m: 1, width: '25ch'},
            }}
            noValidate
            autoComplete="off"
        >
            <div>
                <TextField
                    required
                    id="outlined-required"
                    label="Name"
                    onChange={handleChangeName}
                />
                <TextField
                    required
                    id="outlined-required"
                    label="Email"
                    onChange={handleChangeEmail}
                />
                <TextField
                    id="outlined-password-input"
                    label="Password"
                    type="password"
                    autoComplete="current-password"
                    onChange={handleChangePassword}
                />
                <TextField
                    id="outlined-password-input"
                    label="ConfirmPassword"
                    type="password"
                    autoComplete="current-password"
                    onChange={handleChangeConfirmPassword}
                />
            </div>
            <Button variant="contained" color="primary" type="submit" onClick={handleRegistration}>
                Register
            </Button>
        </Box>
    );

    const registeredTemplate = (
        <Navigate to="/"/>
    );

    return isRegistrationComplete ? registeredTemplate : formTemplate;
}
