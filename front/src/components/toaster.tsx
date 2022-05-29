import React, {useState} from 'react';

import {Alert, AlertColor, Snackbar} from "@mui/material";


export interface ToasterProps {
    open: boolean;
    severity: AlertColor;
    message: string;
    handleClose: any;
}

export function Toaster({open, severity, message, handleClose}: ToasterProps) {
    return (
        <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
            <Alert onClose={handleClose} severity={severity} sx={{width: '100%'}}>
                {message}
            </Alert>
        </Snackbar>
    );
}
