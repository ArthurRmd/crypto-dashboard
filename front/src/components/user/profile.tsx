import React from 'react';
import { useSelector } from "react-redux";
import { ProfileProps } from "../../state/profileSlice";
import { Avatar, Container, Typography } from "@mui/material";
import { Toaster, defaultHandleToastClose } from "../toaster";
import { useTranslation, Trans } from 'react-i18next';

export default function ProfileComponent() {
  const { t } = useTranslation();
  const isLogged: boolean = useSelector((state: any) => state.loger.value);
  const account: ProfileProps = useSelector((state: any) => state.account.value);
  const lang: string = useSelector((state: any) => state.lang.value);
  const forex_currency: string = useSelector((state: any) => state.forex.value);

  function getFirstLettersFromUsername(username: string): string {
    return username
      .split(" ")
      .map(s => s.charAt(0))
      .join('');
  }

  if (isLogged) {
    return (
      <Container>
        <Avatar>{getFirstLettersFromUsername(account.name)}</Avatar>
        <Typography>Name: {account.name}</Typography>
        <Typography>Email: {account.email}</Typography>
        <Typography>{t('profile.select_lang')}: {lang}</Typography>
        <Typography>{t('profile.select_forex_currency')}: {forex_currency.replace("_", " ")}</Typography>
      </Container>
    );
  }

  return (
    <Toaster
      open={true}
      severity={"error"}
      message={t('general.connection.not_connected')}
      handleClose={defaultHandleToastClose}
    />
  );
}
