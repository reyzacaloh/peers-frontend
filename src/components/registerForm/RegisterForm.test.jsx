import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import "@testing-library/jest-dom/extend-expect";
import RegisterForm from './RegisterForm';
import axios, { Axios } from 'axios';
import { act } from 'react-dom/test-utils';

const renderRegisterForm = () => (render(<RegisterForm />));
test('all field in form fully renders', () => {
    renderRegisterForm();
    const emailField = screen.getByTestId("email");
    const passwordField = screen.getByTestId("password");
    const firstNameField = screen.getByTestId("first_name");
    const lastNameField = screen.getByTestId("last_name");
    const dateOfBirth = screen.getByTestId("date_of_birth");
    const profilePic = screen.getByTestId("profile_picture");
    expect(emailField).toBeInTheDocument();
    expect(passwordField).toBeInTheDocument();
    expect(firstNameField).toBeInTheDocument();
    expect(lastNameField).toBeInTheDocument();
    expect(dateOfBirth).toBeInTheDocument();
    expect(profilePic).toBeInTheDocument();
  });

test('when backend API calls succesful', async () => {
    jest.mock('axios');
    axios.post = jest.fn();
    renderRegisterForm();
    const registerButton = screen.getByText('Register');
    const logSpy = jest.spyOn(global.console,'log')
    const expectedResponse = {
        'success': true,
        'statusCode': '201 Created',
        'message': 'User successfully registered!',
        'user': {
          'email': 'test@testmail.com',
          'password': 'testpassword',
          'first_name': 'John',
          'last_name': 'Doe'
        },
    }
    axios.post.mockResolvedValueOnce(expectedResponse);
    fireEvent.click(registerButton);
    await waitFor(() =>
      expect(axios.post).toHaveBeenCalled()
    );
    expect(logSpy).toHaveBeenCalledWith(expectedResponse);
    logSpy.mockRestore();
})

test('when backend API calls unsuccesful', async () => {
  jest.mock('axios');
  axios.post = jest.fn()
  onSubmit = jest.fn()
  renderRegisterForm();
  const logSpy = jest.spyOn(global.console,'log')
  const registerButton = screen.getByText('Register')
  const expectedError = new Error("Network Error");
  axios.post.mockRejectedValueOnce(expectedError);
  fireEvent.click(registerButton);
  await waitFor(() =>
    expect(axios.post).toHaveBeenCalled()
  );
  expect(logSpy).toHaveBeenCalledWith('Error: ',expectedError);
  logSpy.mockRestore();
})