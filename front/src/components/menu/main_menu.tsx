import React from "react";
import { useSelector } from 'react-redux'
import MenuItem from '@mui/material/MenuItem';
import MenuList from '@mui/material/MenuList';
import Stack from '@mui/material/Stack';
import { Link } from "react-router-dom";

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
  new InnerMainMenuItem("Dashboard", "/dashboard"),
  new InnerMainMenuItem("My investments", "/investments"),
  new InnerMainMenuItem("Settings", "/settings"),
];

const LOGIN_ITEMS = [
  new InnerMainMenuItem("Sign in", "/sign-in"),
  new InnerMainMenuItem("Register now", "/register"),
];

const LOGOUT_ITEMS = [
  new InnerMainMenuItem("Account", "/profile"),
  new InnerMainMenuItem("Log out", "/log-out"),
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



