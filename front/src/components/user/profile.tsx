import React from 'react';
import {useSelector} from "react-redux";
import {ProfileProps} from "../../state/profileSlice";
import {Avatar, Container} from "@mui/material";

export default function ProfileComponent() {
    const isLogged: boolean = useSelector((state: any) => state.loger.value);
    const account: ProfileProps = useSelector((state: any) => state.account.value);

    if (isLogged) {
        return (
            <Container>
                <Avatar>N</Avatar>
                <p>{account.name}</p>
                <p>{account.email}</p>
            </Container>
        );
    }
    return (<p></p>);
}
