import React from 'react';
import {useDispatch} from 'react-redux'
import {logout} from '../state/loginSlice';
import {purge} from "../state/profileSlice";
import {TokenService} from "../services/token_service";

export default function LogoutRoute() {

    const loginDispatcher = useDispatch();
    const profileDispatcher = useDispatch();

    loginDispatcher(logout());
    profileDispatcher(purge());
    TokenService.reset();

    return (
        <p>You have been log out successfully</p>
    );
}
