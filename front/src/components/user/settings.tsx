import React, {useState} from 'react';

import {useDispatch} from 'react-redux'
import Box from "@mui/material/Box";
import Button from '@mui/material/Button';
import {changeLang, Lang} from "../../state/langSlice";
import {Toaster} from "../toaster";
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, {SelectChangeEvent} from '@mui/material/Select';

export default function SettingsForm() {
    const langDispatcher = useDispatch();

    const [lang, setLang] = useState('en');
    const [isSaved, setSaved] = useState(false);

    function handleChangeLang(event: SelectChangeEvent) {
        setLang(event.target.value);
        setSaved(false);
    }

    function handleSubmit() {
        langDispatcher(changeLang(lang));
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
                        label="Age"
                        onChange={handleChangeLang}
                    >
                        <MenuItem value={Lang.English}>English</MenuItem>
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