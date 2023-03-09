import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Logout from './Logout';

describe('Logout component', () => {
  test('should remove JWT token from local storage on click', () => {
    const jwtToken = 'sampleJWTToken';
    localStorage.setItem('jwtToken', jwtToken);

    render(<Logout />);

    const logoutButton = screen.getByRole('button', { name: /logout/i });

    fireEvent.click(logoutButton);

    expect(localStorage.getItem('jwtToken')).toBeNull();
  });
});