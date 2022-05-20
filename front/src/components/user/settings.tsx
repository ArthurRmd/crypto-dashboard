import React, {useState} from 'react';

import {useDispatch} from 'react-redux'
import Box from "@mui/material/Box";
import Button from '@mui/material/Button';
import {changeLang, Lang} from "../../state/langSlice";
import {Toaster} from "../toaster";
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, {SelectChangeEvent} from '@mui/material/Select';
import {changeForex} from "../../state/forexSlice";

export default function SettingsForm() {
    const langDispatcher = useDispatch();
    const forexDispatcher = useDispatch();

    const [lang, setLang] = useState('en');
    const [forex, setForex] = useState('EUR');
    const [isSaved, setSaved] = useState(false);

    function handleChangeLang(event: SelectChangeEvent) {
        setLang(event.target.value);
        setSaved(false);
    }

    function handleChangeLForex(event: SelectChangeEvent) {
        setForex(event.target.value);
        setSaved(false);
    }

    function handleSubmit() {
        langDispatcher(changeLang(lang));
        forexDispatcher(changeForex(forex));
        setSaved(true);
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
                        value={lang}
                        label="Lang"
                        onChange={handleChangeLang}
                    >
                        <MenuItem value={Lang.English}>English</MenuItem>
                    </Select>

                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={forex}
                        label="Age"
                        onChange={handleChangeLForex}
                    >
                        <MenuItem value="EUR">Euro</MenuItem>
                        <MenuItem value="USD">US Dollar</MenuItem>
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