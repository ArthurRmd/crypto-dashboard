import React from 'react';
import { useDispatch } from 'react-redux'
import { logout } from '../state/loginSlice';

export default function Logout() {

  const loginDispatcher = useDispatch();
  loginDispatcher(logout());
  return (
    <p>You have been log out successfuly</p>
  );
}
