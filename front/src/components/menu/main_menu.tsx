import React from "react";
import MenuItem from '@mui/material/MenuItem';
import MenuList from '@mui/material/MenuList';
import Stack from '@mui/material/Stack';

export default function MainMenu() {

  const menuItemsNames = [
    InnerMainMenuItem.create("Dashboard", ""),
    InnerMainMenuItem.create("My investments", ""),
    InnerMainMenuItem.create("Settings", ""),
    InnerMainMenuItem.create("Sign in", ""),
    InnerMainMenuItem.create("Register now", ""),
  ];

  return (
    <Stack direction="row" spacing={2}>
      <MenuList>
        {menuItemsNames.map((item) => <MenuItem> {item.getTitle()} </MenuItem>)}
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

  private constructor(
    title: string,
    redirect: string
  ) {
    this.title = title;
    this.redirect = redirect;
  }

  public getTitle(): string {
    return this.title;
  }

  public getRedirect(): string {
    return this.redirect;
  }
}

