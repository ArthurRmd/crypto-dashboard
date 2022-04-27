import React, {useState} from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import {UserService} from '../../services/user_service';
import {Navigate} from "react-router-dom";
import {LoginPayloadDo} from '../../models/do/login';

export interface LoginProps {
    userService: UserService;
}

export default function LoginForm({userService}: LoginProps) {

    const [isLogged, setLogged] = useState(false);
    // Form fields
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    function handleChangeEmail(event: React.ChangeEvent<HTMLInputElement>) {
        setEmail(event.target.value);
    }

    function handleChangePassword(event: React.ChangeEvent<HTMLInputElement>) {
        setPassword(event.target.value);
    }

    function handleLogin() {
        const payload = new LoginPayloadDo(email, password);
        userService.login(payload)
            .then((response) => {
                setLogged(true);
            })
            .catch((_error) => {
                setLogged(false);
            });
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
            </div>
            <Button variant="contained" color="primary" onClick={handleLogin}>
                Sign in
            </Button>
        </Box>

    );


    const loggedTemplate = (
        <Navigate to="/"/>
    );

    return isLogged ? loggedTemplate : formTemplate;
}
