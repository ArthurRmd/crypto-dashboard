import React from "react";
import {useSelector} from 'react-redux'
import MenuItem from '@mui/material/MenuItem';
import MenuList from '@mui/material/MenuList';
import Stack from '@mui/material/Stack';
import {Link} from "react-router-dom";
import {
    DASHBOARD_ROUTE,
    INVESTMENTS_ROUTE,
    LOG_OUT_ROUTE,
    PROFILE_ROUTE,
    REGISTER_ROUTE,
    SIGN_IN_ROUTE
} from "../../routes/router";

class InnerMainMenuItem {
    private readonly title: string;
    private readonly redirect: string;

    public constructor(
        title: string,
        redirect: string
    ) {
        this.title = title;
        this.redirect = redirect;
    }

    public render() {
        return (
            <MenuItem>
                <Link to={this.redirect}>
                    {this.title}
                </Link>
            </MenuItem>
        );
    }

}

const BASE_ITEMS = [
    new InnerMainMenuItem("Dashboard", DASHBOARD_ROUTE),
    new InnerMainMenuItem("My investments", INVESTMENTS_ROUTE),
    new InnerMainMenuItem("Settings", "/settings"),
];

const LOGIN_ITEMS = [
    new InnerMainMenuItem("Sign in", SIGN_IN_ROUTE),
    new InnerMainMenuItem("Register now", REGISTER_ROUTE),
];

const LOGOUT_ITEMS = [
    new InnerMainMenuItem("Account", PROFILE_ROUTE),
    new InnerMainMenuItem("Log out", LOG_OUT_ROUTE),
];

function getItemsRelatedToLoginStatus(loginStatus: boolean): InnerMainMenuItem[] {
    if (!loginStatus) {
        return LOGIN_ITEMS;
    }
    return LOGOUT_ITEMS;
}

export default function MainMenu() {

    const isLogged: boolean = useSelector((state: any) => state.loger.value);

    let menuItems = BASE_ITEMS;
    menuItems = menuItems.concat(getItemsRelatedToLoginStatus(isLogged));

    return (
        <Stack direction="row" spacing={2}>
            <MenuList>
                {menuItems.map((item) => item.render())}
            </MenuList>
        </Stack>
    );
}



