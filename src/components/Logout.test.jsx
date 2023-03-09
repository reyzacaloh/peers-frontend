import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Logout from './Logout';

describe('Logout', () => {
  test('renders a "Logout" button', () => {
    render(
      <BrowserRouter>
        <Logout />
      </BrowserRouter>
    );

    const logoutButton = screen.getByText(/Logout/i);
    expect(logoutButton).toBeInTheDocument();
  });

  test('calls the handleLogout function when clicked', () => {
    const handleLogout = jest.fn();
    render(
      <BrowserRouter>
        <Logout handleLogout={handleLogout} />
      </BrowserRouter>
    );

    const logoutButton = screen.getByText(/Logout/i);
    fireEvent.click(logoutButton);

    expect(localStorage.getItem('jwtToken')).toBeNull();
  });
});
