import React, { useState } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { UserService } from '../../services/user_service';
import { Navigate } from "react-router-dom";
import { useDispatch } from 'react-redux'
import { login, logout } from '../../state/loginSlice';
import { purge, update } from "../../state/profileSlice";
import { TokenService } from "../../services/token_service";
import { changeLang } from "../../state/langSlice";
import { changeForex } from "../../state/forexSlice";
import { LoginUserDo } from "../../models/do/login";
import { Toaster } from '../toaster';
import { AlertColor } from '@mui/material';
import { DASHBOARD_ROUTE } from '../../routes/router';
import { useTranslation } from 'react-i18next';

export interface LoginProps {
  userService: UserService;
}

export default function LoginForm({ userService }: LoginProps) {
  const { t } = useTranslation();

  const loginDispatcher = useDispatch();
  const profileDispatcher = useDispatch();
  const langDispatcher = useDispatch();
  const forexDispatcher = useDispatch();

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

  function updateDispatchers(user: LoginUserDo) {
    loginDispatcher(login());
    profileDispatcher(update({
      name: user.name,
      email: user.email
    }));
    langDispatcher(changeLang(user.language));
    forexDispatcher(changeForex(user.forex_currency));
  }

  function handleLogin() {
    const payload = { email: email, password: password };
    userService.login(payload)
      .then((response) => {
        setLogged(true);
        TokenService.save(response.data.token);
        updateDispatchers(response.data.user);
      })
      .catch((error) => {
        setLogged(false);
        loginDispatcher(logout());
        TokenService.reset();
        profileDispatcher(purge());
        setDisplayToast(true);
        setToastSeverity('error');
        setToastMessage(error.message);
      });
  }

  // Toast 
  const [displayToast, setDisplayToast] = useState(false);
  const [toastSeverity, setToastSeverity] = useState<AlertColor>("info");
  const [toastMessage, setToastMessage] = useState("Hello");


  const handleToastClose = (event: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }
    setDisplayToast(false);
  };



  if (isLogged) {
    return (
      <Navigate to={"/" + DASHBOARD_ROUTE} />
    );
  }

  return (
    <Box
      component="form"
      sx={{
        '& .MuiTextField-root': { m: 1, width: '25ch' },
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

      <Toaster
        open={displayToast}
        severity={toastSeverity}
        message={toastMessage}
        handleClose={handleToastClose}
      />
    </Box>

  );
}
