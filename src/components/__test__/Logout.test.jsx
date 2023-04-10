import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Logout from '../logout/Logout';
import AuthContextProvider from "../../contexts/AuthContext";

describe('Logout', () => {
  test('renders a "Logout" button', () => {
    render(
      <AuthContextProvider>
        <BrowserRouter>
          <Logout />
        </BrowserRouter>
      </AuthContextProvider>
      
    );

    const logoutButton = screen.getByText(/Logout/i);
    expect(logoutButton).toBeInTheDocument();
  });

  test('calls the handleLogout function when clicked', () => {
    const handleLogout = jest.fn();
    render(
      <AuthContextProvider>
        <BrowserRouter>
          <Logout handleLogout={handleLogout} />
        </BrowserRouter>
      </AuthContextProvider>
      
    );

    const logoutButton = screen.getByText(/Logout/i);
    fireEvent.click(logoutButton);

    expect(localStorage.getItem('jwtToken')).toBeNull();
  });
});
