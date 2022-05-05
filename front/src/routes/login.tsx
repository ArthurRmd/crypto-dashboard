import React from 'react';
import LoginForm from '../components/user/login';
import { UserService } from '../services/user_service';

export default function Login() {

  const userService = UserService.create();

  return (
    <LoginForm userService={userService} />
  );
}
