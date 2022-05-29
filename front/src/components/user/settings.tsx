import React, { useEffect, useState } from 'react';

import { useDispatch, useSelector } from 'react-redux'
import Box from "@mui/material/Box";
import Button from '@mui/material/Button';
import { changeLang } from "../../state/langSlice";
import { Toaster } from "../toaster";
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { changeForex } from "../../state/forexSlice";
import { SettingsService } from "../../services/settings_service";
import { TokenService } from "../../services/token_service";
import { UserService } from "../../services/user_service";
import TextField from "@mui/material/TextField";
import { AlertColor } from '@mui/material';
import { useTranslation } from 'react-i18next';

export interface SettingsFormProps {
  settingsService: SettingsService;
  userService: UserService;
}

export default function SettingsForm({ settingsService, userService }: SettingsFormProps) {
  const { t } = useTranslation();
  const lang: string = useSelector((state: any) => state.lang.value);
  const forex_currency: string = useSelector((state: any) => state.forex.value);

  const langDispatcher = useDispatch();
  const forexDispatcher = useDispatch();

  const [lang_form, setLangForm] = useState(lang);
  const [forex_form, setForexForm] = useState(forex_currency);
  const [password_form, setPasswordForm] = useState("");
  const [passwordConfirm_form, setPasswordConfirmForm] = useState("");
  const [langs, setLangs] = useState<string[]>([]);
  const [forexCurrencies, setForexCurrencies] = useState<string[]>([]);

  // Toast 
  const [displayToast, setDisplayToast] = useState(false);
  const [toastSeverity, setToastSeverity] = useState<AlertColor>("info");
  const [toastMessage, setToastMessage] = useState("Hello");

  useEffect(() => {
    settingsService.fetchLangs()
      .then(langs => setLangs(langs));
  }, []);

  useEffect(() => {
    settingsService.fetchForexCurrencies()
      .then(currencies => setForexCurrencies(currencies));
  }, []);

  const handleToastClose = (event: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }
    setDisplayToast(false);
  };

  function handleChangeLang(event: SelectChangeEvent) {
    setLangForm(event.target.value);
  }

  function handleChangeLForex(event: SelectChangeEvent) {
    setForexForm(event.target.value);
  }

  function handleChangePassword(event: React.ChangeEvent<HTMLInputElement>) {
    setPasswordForm(event.target.value);
  }

  function handleChangeConfirmPassword(event: React.ChangeEvent<HTMLInputElement>) {
    setPasswordConfirmForm(event.target.value);
  }

  function handleSubmit() {
    let token = TokenService.getToken();
    settingsService.updateLang(token, { language: lang_form })
      .then((_) => {
        langDispatcher(changeLang(lang_form));
      }).catch(_ => {
        setToastSeverity("error");
      });

    settingsService.updateForexCurrency(token, { forex_currency: forex_form })
      .then((_) => {
        forexDispatcher(changeForex(forex_form));
      }).catch(_ => {
        setToastSeverity("error");
      });

    setToastMessage(t('profile.success_settings_registered'));

    if (password_form && passwordConfirm_form && password_form === passwordConfirm_form) {
      userService.update(token, { password: password_form })
        .then(_ => {
          setToastSeverity("info");
          setToastMessage(t('profile.success_settings_password_changed'));
        }).catch(_ => {
          setToastSeverity("error");
        });
    }

    setDisplayToast(true);
  }

  return (
    <div>
      <Box
        component="form"
        sx={{
          '& .MuiTextField-root': { m: 1, width: '25ch' },
        }}
        noValidate
        autoComplete="off"
      >
        <FormControl fullWidth>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={lang_form}
            label="Lang"
            onChange={handleChangeLang}
          >
            {langs.map(l => <MenuItem value={l}>{l}</MenuItem>)}
          </Select>

          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={forex_form}
            label="forex"
            onChange={handleChangeLForex}
          >
            {forexCurrencies.map(fc => {
              return (<MenuItem value={fc}>
                {fc.replace("_", " ")}
              </MenuItem>)
            })}
          </Select>

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


          <Button variant="contained" color="primary" onClick={handleSubmit}>
            Save
          </Button>
        </FormControl>
      </Box>

      <Toaster
        open={displayToast}
        severity={toastSeverity}
        message={toastMessage}
        handleClose={handleToastClose}
      />
    </div>
  );
}
