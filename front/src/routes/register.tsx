import React from 'react';
import RegisterForm from '../components/user/register';
import { UserService } from '../services/user_service';

export default function RegisterRoute() {

  const userService = UserService.create();

  return (
    <RegisterForm userService={userService} />
  );
}
