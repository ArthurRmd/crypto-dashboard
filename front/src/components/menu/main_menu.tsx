import React from "react";
import MenuItem from '@mui/material/MenuItem';
import MenuList from '@mui/material/MenuList';
import Stack from '@mui/material/Stack';
import { Link } from "react-router-dom";

export default function MainMenu() {

  const menuItemsNames = [
    new InnerMainMenuItem("Dashboard", "/dashboard"),
    new InnerMainMenuItem("My investments", "/investments"),
    new InnerMainMenuItem("Settings", "/settings"),
    new InnerMainMenuItem("Sign in", "/sign-in"),
    new InnerMainMenuItem("Register now", "/register"),
  ];

  return (
    <Stack direction="row" spacing={2}>
      <MenuList>
        {menuItemsNames.map((item) => item.render())}
      </MenuList>
    </Stack>
  );
}


class InnerMainMenuItem {
  private title: string;
  private redirect: string;

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

