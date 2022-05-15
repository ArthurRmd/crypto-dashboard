import React from 'react';
import LoginForm from '../components/user/login';
import {UserService} from '../services/user_service';

export default function LoginRoute() {

    const userService = UserService.create();

    return (
        <LoginForm userService={userService}/>
    );
}
