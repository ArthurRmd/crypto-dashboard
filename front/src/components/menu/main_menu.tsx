import React from "react";
import { useSelector } from 'react-redux'
import {
  DASHBOARD_ROUTE,
  INVESTMENTS_ROUTE,
  LOG_OUT_ROUTE,
  PROFILE_ROUTE,
  REGISTER_ROUTE,
  SIGN_IN_ROUTE
} from "../../routes/router";
import { AppBar, Container, IconButton, Toolbar, Typography } from "@mui/material";
import { NavLink } from "react-router-dom";
import Box from '@mui/material/Box';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import MainMenuItem from "./main_menu_item";

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

          <NavLink to={"/" + DASHBOARD_ROUTE}>
            <Typography
              variant="h6"
              noWrap
              component="a"
              sx={{
                mr: 2,
                display: { xs: 'none', md: 'flex' },
                fontWeight: 500,
                letterSpacing: '.3rem',
                color: 'inherit',
                textDecoration: 'none',
              }}
            >
              Crypto Dashboard
            </Typography>
          </NavLink>

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
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
                display: { xs: 'block', md: 'none' },
              }}
            >
              {menuItems.map((item) => <MainMenuItem key={item.name} title={item.name}
                redirect={item.route}
                isLightLink={false} />)}
            </Menu>
          </Box>
          <Typography
            variant="h5"
            noWrap
            component="a"
            href=""
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
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
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {menuItems.map((item) => <MainMenuItem key={item.name} title={item.name} redirect={item.route}
              isLightLink={true} />)}
          </Box>

          <Box sx={{ flexGrow: 0, display: { xs: 'none', md: 'flex' } }}>
            {(!isLogged ? LOGIN_ITEMS : LOGOUT_ITEMS).map((item) => <MainMenuItem key={item.name}
              title={item.name}
              redirect={item.route}
              isLightLink={true} />)}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}



