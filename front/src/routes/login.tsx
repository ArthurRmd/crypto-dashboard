import React from 'react';
import LoginForm from '../components/user/login';
import {UserService} from '../services/user_service';

export default function LoginRoute() {

    const userService = UserService.create();

    return (
        <div>
            <h1>Sign in</h1>
            <LoginForm userService={userService}/>
        </div>
    );
}
