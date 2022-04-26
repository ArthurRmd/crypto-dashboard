import React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

export default function RegisterForm() {
  return (
    <Box
      component="form"
      sx={{
        '& .MuiTextField-root': { m: 1, width: '25ch' },
      }}
      noValidate
      autoComplete="off"
    >
      <div>
        <TextField
          required
          id="outlined-required"
          label="Name"
        />
        <TextField
          required
          id="outlined-required"
          label="Email"
        />
        <TextField
          id="outlined-password-input"
          label="Password"
          type="password"
          autoComplete="current-password"
        />
      </div>
    </Box>
  );
}
