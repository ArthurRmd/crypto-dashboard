import React from "react";
import {useSelector} from 'react-redux'
import MenuItem from '@mui/material/MenuItem';
import {Link} from "react-router-dom";
import {
    DASHBOARD_ROUTE,
    INVESTMENTS_ROUTE,
    LOG_OUT_ROUTE,
    PROFILE_ROUTE,
    REGISTER_ROUTE,
    SIGN_IN_ROUTE
} from "../../routes/router";
import {AppBar, Container, IconButton, Toolbar, Typography} from "@mui/material";


import Box from '@mui/material/Box';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Avatar from '@mui/material/Avatar';
import Tooltip from '@mui/material/Tooltip';

class InnerMainMenuItem {
    private readonly title: string;
    private readonly redirect: string;
    private readonly isLightLink: boolean;

    public constructor(
        title: string,
        redirect: string,
        isLightLink: boolean
    ) {
        this.title = title;
        this.redirect = redirect;
        this.isLightLink = isLightLink;
    }

    public render() {
        return (
            <MenuItem key={this.title}>
                <Link to={this.redirect} className={this.isLightLink ? 'light-link' : 'dark-link'}>
                    {this.title}
                </Link>
            </MenuItem>
        );
    }

}

const BASE_ITEMS = [
    {
        "name": "Dashboard",
        "route": DASHBOARD_ROUTE
    },
    {
        "name": "My investments",
        "route": INVESTMENTS_ROUTE
    }
];

const LOGIN_ITEMS = [
    {
        "name": "Sign in",
        "route": SIGN_IN_ROUTE
    },
    {
        "name": "Register now",
        "route": REGISTER_ROUTE
    }
];

const LOGOUT_ITEMS = [
    {
        "name": "Account",
        "route": PROFILE_ROUTE
    },
    {
        "name": "Log out",
        "route": LOG_OUT_ROUTE
    }
];

function getItemsRelatedToLoginStatus(loginStatus: boolean) {
    if (!loginStatus) {
        return LOGIN_ITEMS;
    }
    return LOGOUT_ITEMS;
}

const settings = ['Profile', 'Account', 'Logout'];

export default function MainMenu() {

    const isLogged: boolean = useSelector((state: any) => state.loger.value);

    let menuItems = BASE_ITEMS;


    const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);
    const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);

    const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElNav(event.currentTarget);
    };
    const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    return (
        <AppBar position="static">
            <Container maxWidth="xl">
                <Toolbar disableGutters>
                    <Typography
                        variant="h6"
                        noWrap
                        component="a"
                        href="/"
                        sx={{
                            mr: 2,
                            display: {xs: 'none', md: 'flex'},
                            fontWeight: 500,
                            letterSpacing: '.3rem',
                            color: 'inherit',
                            textDecoration: 'none',
                        }}
                    >
                        Crypto Dashboard
                    </Typography>

                    <Box sx={{flexGrow: 1, display: {xs: 'flex', md: 'none'}}}>
                        <IconButton
                            size="large"
                            aria-label="account of current user"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            onClick={handleOpenNavMenu}
                            color="inherit"
                        >
                            <MenuIcon/>
                        </IconButton>
                        <Menu
                            id="menu-appbar"
                            anchorEl={anchorElNav}
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'left',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'left',
                            }}
                            open={Boolean(anchorElNav)}
                            onClose={handleCloseNavMenu}
                            sx={{
                                display: {xs: 'block', md: 'none'},
                            }}
                        >
                            {menuItems.map((item) => new InnerMainMenuItem(item.name, item.route, false).render())}
                        </Menu>
                    </Box>
                    <Typography
                        variant="h5"
                        noWrap
                        component="a"
                        href=""
                        sx={{
                            mr: 2,
                            display: {xs: 'flex', md: 'none'},
                            flexGrow: 1,
                            fontFamily: 'monospace',
                            fontWeight: 700,
                            letterSpacing: '.3rem',
                            color: 'inherit',
                            textDecoration: 'none',
                        }}
                    >
                        Crypto Dashboard
                    </Typography>
                    <Box sx={{flexGrow: 1, display: {xs: 'none', md: 'flex'}}}>
                        {menuItems.map((item) => new InnerMainMenuItem(item.name, item.route, true).render())}
                    </Box>

                    <Box sx={{flexGrow: 0, display: {xs: 'none', md: 'flex'}}}>
                            {(!isLogged?LOGIN_ITEMS:LOGOUT_ITEMS).map((item) => new InnerMainMenuItem(item.name, item.route, true).render())}
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
    );
}



