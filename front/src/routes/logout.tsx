import React from 'react';
import {useDispatch} from 'react-redux'
import {logout} from '../state/loginSlice';
import {purge} from "../state/profileSlice";

export default function LogoutRoute() {

    const loginDispatcher = useDispatch();
    const profileDispatcher = useDispatch();

    loginDispatcher(logout());
    profileDispatcher(purge());

    return (
        <p>You have been log out successfully</p>
    );
}
