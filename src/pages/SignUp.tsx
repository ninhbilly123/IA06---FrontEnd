// src/pages/SignUp.tsx
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Button, TextField, Typography, Alert, Stack, Snackbar } from '@mui/material';
import { useMutation } from 'react-query';
import { useNavigate } from 'react-router-dom';

interface FormData {
  email: string;
  password: string;
}

const SignUp = () => {
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors } } = useForm<FormData>();

  // Hàm gọi API đăng ký
  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

  const [successOpen, setSuccessOpen] = useState(false);
  const [errorOpen, setErrorOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const mutation = useMutation(
    async (data: FormData) => {
      const res = await fetch(`${API_URL}/user/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      const payload = await res.json();
      if (!res.ok || payload?.success === false) {
        const message = payload?.message || 'Registration failed';
        throw new Error(message);
      }
      return payload;
    },
    {
      onSuccess: () => {
        setSuccessOpen(true);
        setTimeout(() => navigate('/login'), 800);
      },
      onError: (error: any) => {
        setErrorMessage(error?.message || 'Network error');
        setErrorOpen(true);
      },
    }
  );

  const onSubmit = (data: FormData) => {
    mutation.mutate(data);
  };

  return (
    <Stack spacing={2}>
      <Typography variant="h4" gutterBottom>
        Sign Up
      </Typography>
      {mutation.isError && (
        <Alert severity="error">{errorMessage || 'An error occurred'}</Alert>
      )}
      <form onSubmit={handleSubmit(onSubmit)}>
        <TextField
          label="Email"
          fullWidth
          margin="normal"
          {...register('email', {
            required: 'Email is required',
            pattern: {
              value: /^[^@\s]+@[^@\s]+\.[^@\s]+$/,
              message: 'Invalid email format',
            },
          })}
          error={!!errors.email}
          helperText={errors.email?.message}
        />
        <TextField
          label="Password"
          fullWidth
          margin="normal"
          type="password"
          {...register('password', {
            required: 'Password is required',
            minLength: { value: 6, message: 'Min 6 characters' },
          })}
          error={!!errors.password}
          helperText={errors.password?.message}
        />
        <Button type="submit" variant="contained" color="primary" disabled={mutation.isLoading}>
          {mutation.isLoading ? 'Registering...' : 'Sign Up'}
        </Button>
      </form>
      <Snackbar
        open={successOpen}
        autoHideDuration={2500}
        onClose={() => setSuccessOpen(false)}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert onClose={() => setSuccessOpen(false)} severity="success" variant="filled">
          Registered successfully!
        </Alert>
      </Snackbar>
      <Snackbar
        open={errorOpen}
        autoHideDuration={3000}
        onClose={() => setErrorOpen(false)}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert onClose={() => setErrorOpen(false)} severity="error" variant="filled">
          {errorMessage}
        </Alert>
      </Snackbar>
    </Stack>
  );
};

export default SignUp;
