import React from 'react';
import {useSelector} from "react-redux";
import {ProfileProps} from "../../state/profileSlice";
import {Avatar, Container} from "@mui/material";

export default function ProfileComponent() {
    const isLogged: boolean = useSelector((state: any) => state.loger.value);
    const account: ProfileProps = useSelector((state: any) => state.account.value);
    const lang: string = useSelector((state: any) => state.lang.value);
    const forex_currency: string = useSelector((state: any) => state.forex.value);

    if (isLogged) {
        return (
            <Container>
                <Avatar>N</Avatar>
                <p>{account.name}</p>
                <p>{account.email}</p>
                <p>Selected lang: {lang}</p>
                <p>Forex currency: {forex_currency.replace("_", " ")}</p>
            </Container>
        );
    }
    return (<p></p>);
}
