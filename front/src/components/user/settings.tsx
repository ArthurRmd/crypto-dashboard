import React, {useEffect, useState} from 'react';

import {useDispatch, useSelector} from 'react-redux'
import Box from "@mui/material/Box";
import Button from '@mui/material/Button';
import {changeLang} from "../../state/langSlice";
import {Toaster} from "../toaster";
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, {SelectChangeEvent} from '@mui/material/Select';
import {changeForex} from "../../state/forexSlice";
import {SettingsService} from "../../services/settings_service";
import {TokenService} from "../../services/token_service";

export interface SettingsFormProps {
    settingsService: SettingsService;
}

export default function SettingsForm({settingsService}: SettingsFormProps) {
    const lang: string = useSelector((state: any) => state.lang.value);
    const forex_currency: string = useSelector((state: any) => state.forex.value);

    const langDispatcher = useDispatch();
    const forexDispatcher = useDispatch();

    const [lang_form, setLangForm] = useState(lang);
    const [forex_form, setForexForm] = useState(forex_currency);
    const [isSaved, setSaved] = useState(false);
    const [langs, setLangs] = useState<string[]>([]);
    const [forexCurrencies, setForexCurrencies] = useState<string[]>([]);

    useEffect(() => {
        settingsService.fetchLangs()
            .then(langs => setLangs(langs));
    }, []);

    useEffect(() => {
        settingsService.fetchForexCurrencies()
            .then(currencies => setForexCurrencies(currencies));
    }, []);

    function handleChangeLang(event: SelectChangeEvent) {
        setLangForm(event.target.value);
        setSaved(false);
    }

    function handleChangeLForex(event: SelectChangeEvent) {
        setForexForm(event.target.value);
        setSaved(false);
    }

    function handleSubmit() {
        setSaved(true);
        settingsService.updateLang(TokenService.getToken(), {language: lang_form})
            .then((_) => {
                langDispatcher(changeLang(lang_form));
            })
        forexDispatcher(changeForex(forex_form));
    }

    return (
        <div>
            <Box
                component="form"
                sx={{
                    '& .MuiTextField-root': {m: 1, width: '25ch'},
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


                    <Button variant="contained" color="primary" onClick={handleSubmit}>
                        Save
                    </Button>
                </FormControl>
            </Box>

            <Toaster default_open={isSaved} severity={"info"} message={"Settings have been registered !"}/>
        </div>
    );
}