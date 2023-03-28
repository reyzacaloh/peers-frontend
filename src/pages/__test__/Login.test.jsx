import React from 'react';
import Login from '../Login/Login';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import AuthContextProvider from '../../contexts/AuthContext';

test('renders login form', () => {
  render(<AuthContextProvider><Login /></AuthContextProvider>, {wrapper: BrowserRouter});
  const emailInput = screen.getByTestId('email');
  const passwordInput =screen.getByTestId('pass');
  const loginButton = screen.getByText('Login');

  expect(emailInput).toBeInTheDocument();
  expect(passwordInput).toBeInTheDocument();
  expect(loginButton).toBeInTheDocument();
});