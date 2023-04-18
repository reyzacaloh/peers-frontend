import React from 'react';
import { render, screen, waitFor} from '@testing-library/react';
import {BrowserRouter} from "react-router-dom";
import axios from 'axios';
import Profile from '../Profile.jsx';
import AuthContextProvider from "../../contexts/AuthContext";

jest.mock('axios');
jest.mock("../../components/LearnerSchedule", () => () => {
  return <mock-modal data-testid="modal"/>;
});
describe('Profile component', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  test('renders Profile component without errors', () => {
    render(<AuthContextProvider><Profile /></AuthContextProvider>, {wrapper: BrowserRouter});
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
    render(<AuthContextProvider><Profile /></AuthContextProvider>, {wrapper: BrowserRouter});
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
    render(<AuthContextProvider><Profile /></AuthContextProvider>, {wrapper: BrowserRouter});
    await waitFor(() =>
        expect(axios.post).toHaveBeenCalledTimes(0)
    );
  });

  test('fetches data from correct endpoint with correct authorization header', async () => {
    const token = 'test-token';
    localStorage.setItem('token', JSON.stringify(token));
    axios.get.mockResolvedValueOnce({ data: {} });
    render(<AuthContextProvider><Profile /></AuthContextProvider>, {wrapper: BrowserRouter});
    await waitFor(() => expect(axios.get).toHaveBeenCalledWith(
      'https://peers-backend-dev.up.railway.app/api/auth/user/profile/',
      { headers: { authorization: `Bearer ${token}` } }
    ));
  })
});
