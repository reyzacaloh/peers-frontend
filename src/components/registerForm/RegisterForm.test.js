import { render, screen, fireEvent } from '@testing-library/react';
import RegisterForm from './RegisterForm';
import axios from 'axios';
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

test('when backend API calls succesful', () => {
    jest.mock('axios');
    axios.post = jest.fn()
    renderRegisterForm();
    const registerButton = screen.getByText('Register')
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
    expect(axios.post).toHaveBeenCalledTimes(1);
})