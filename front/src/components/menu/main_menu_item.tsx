import React from "react";
import MenuItem from '@mui/material/MenuItem';
import {Link} from "react-router-dom";

export interface MainMenuItemProps {
    title: string;
    redirect: string;
    isLightLink: boolean;
}

export default function MainMenuItem({title, redirect, isLightLink}: MainMenuItemProps) {
    return (

        <Link to={redirect} className={isLightLink ? 'light-link' : 'dark-link'}>
            <MenuItem key={title}>
                {title}
            </MenuItem>
        </Link>
);
}
