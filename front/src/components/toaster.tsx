import React, {useState} from 'react';

import {Alert, AlertColor, Snackbar} from "@mui/material";


export interface ToasterProps {
    default_open: boolean;
    severity: AlertColor;
    message: string;
}

export function Toaster({default_open, severity, message}: ToasterProps) {

    const [open, setOpen] = useState(default_open);

    function handleClose(event?: React.SyntheticEvent | Event, reason?: string) {
        if (reason === 'clickaway') {
            return;
        }

        setOpen(false);
    }

    return (
        <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
            <Alert onClose={handleClose} severity={severity} sx={{width: '100%'}}>
                {message}
            </Alert>
        </Snackbar>
    );
}