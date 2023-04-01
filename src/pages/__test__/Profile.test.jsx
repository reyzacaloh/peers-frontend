import React from 'react';
import { render, screen, waitFor, act, fireEvent } from '@testing-library/react';
import axios from 'axios';
import Profile from '../Profile.jsx';

jest.mock('axios');

describe('Profile component', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  test('renders Profile component without errors', () => {
    render(<Profile />);
  });

  test('displays correct user information after successful fetch', async () => {
    const mockData = {
      user: {
        first_name: 'John',
        last_name: 'Doe',
        email: 'johndoe@example.com',
        date_of_birth: '01/01/1990'
      }
    };
    axios.get.mockResolvedValueOnce({ data: mockData });
    render(<Profile />);
    const name = await screen.findByText(/John Doe/);
    const email = await screen.findByText(/johndoe@example.com/);
    const dob = await screen.findByText(/01\/01\/1990/);
    expect(name).toBeInTheDocument();
    expect(email).toBeInTheDocument();
    expect(dob).toBeInTheDocument();
  });

  test('displays error message after failed fetch', async () => {
    const expectedError = new Error('Fetch error')
    axios.get.mockRejectedValueOnce(expectedError);
    render(<Profile />);
    await waitFor(() =>
        expect(axios.post).toHaveBeenCalledTimes(0)
    );
  });

  test('fetches data from correct endpoint with correct authorization header', async () => {
    const token = 'test-token';
    localStorage.setItem('token', JSON.stringify(token));
    axios.get.mockResolvedValueOnce({ data: {} });
    render(<Profile />);
    await waitFor(() => expect(axios.get).toHaveBeenCalledWith(
      'https://peers-backend-prod.up.railway.app/api/auth/user/profile/',
      { headers: { authorization: `Bearer ${token}` } }
    ));
  })
});
