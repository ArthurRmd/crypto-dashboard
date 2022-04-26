import React from "react";
import MenuItem from '@mui/material/MenuItem';
import MenuList from '@mui/material/MenuList';
import Stack from '@mui/material/Stack';
import { Link } from "react-router-dom";

export default function MainMenu() {

  const menuItemsNames = [
    InnerMainMenuItem.create("Dashboard", "/dashboard"),
    InnerMainMenuItem.create("My investments", "/investments"),
    InnerMainMenuItem.create("Settings", "/settings"),
    InnerMainMenuItem.create("Sign in", "/sign-in"),
    InnerMainMenuItem.create("Register now", "/register"),
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

  public static create(
    title: string,
    redirect: string
  ): InnerMainMenuItem {
    return new InnerMainMenuItem(title, redirect);
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

  private constructor(
    title: string,
    redirect: string
  ) {
    this.title = title;
    this.redirect = redirect;
  }
}

