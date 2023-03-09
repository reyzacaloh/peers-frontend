import { render, screen, act, waitFor } from '@testing-library/react';
import "@testing-library/jest-dom/extend-expect";
import userEvent from '@testing-library/user-event'
import RegisterForm from '../registerForm/RegisterForm';
import axios from 'axios';

describe('RegisterForm test', () => {
  let emailField;
  let passwordField;
  let firstNameField;
  let lastNameField;
  let dateOfBirth;
  let profilePic;
  let registerButton;
  let file;
  beforeEach(() => {
    file = new File(["(⌐□_□)"], "chucknorris.jpg", { type: "image/jpg" });
    render(<RegisterForm />);
    emailField = screen.getByTestId("email");
    passwordField = screen.getByTestId("password");
    firstNameField = screen.getByTestId("first_name");
    lastNameField = screen.getByTestId("last_name");
    dateOfBirth = screen.getByTestId("date_of_birth");
    profilePic = screen.getByTestId("profile_picture");
    registerButton = screen.getByText('Register');
  });

  test('all field in form fully renders', () => {
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
      const logSpy = jest.spyOn(global.console,'log')
      const expectedResponse = {
          'success': true,
          'statusCode': '201 Created',
          'message': 'User successfully registered!',
          'userEvent': {
            'email': 'test@testmail.com',
            'password': 'testpassword',
            'first_name': 'John',
            'last_name': 'Doe'
          },
      }
      axios.post.mockResolvedValueOnce(expectedResponse);
      act(() => {
        userEvent.type(emailField, 'test@testmail.com')
        userEvent.type(passwordField, 'testpassword')
        userEvent.type(firstNameField, 'John')
        userEvent.type(lastNameField, 'Doe')
        userEvent.type(dateOfBirth, '2003-03-08')
        userEvent.upload(profilePic, file)
        userEvent.click(registerButton);
      });
      await waitFor(() =>
          expect(axios.post).toHaveBeenCalled()
        );
      expect(logSpy).toHaveBeenCalledWith('success');
      logSpy.mockRestore();
  })

  test('when backend API calls unsuccesful', async () => {
    jest.mock('axios');
    axios.post = jest.fn();
    const logSpy = jest.spyOn(global.console,'log')
    const expectedError = new Error("Network Error");
    axios.post.mockRejectedValueOnce(expectedError);
    act(()=> {
      userEvent.type(emailField, 'test@testmail.com')
      userEvent.type(passwordField, 'testpassword')
      userEvent.type(firstNameField, 'John')
      userEvent.type(lastNameField, 'Doe')
      userEvent.type(dateOfBirth, '2003-03-08')
      userEvent.upload(profilePic, file)
      userEvent.click(registerButton);
      
    })
    await waitFor(() =>
        expect(axios.post).toHaveBeenCalled()
    );
    expect(logSpy).toHaveBeenCalledWith('Error: ',expectedError.message);
    logSpy.mockRestore();
  })

  test('not call API when fields are empty', async () => {
    jest.mock('axios');
    axios.post = jest.fn();
    userEvent.click(registerButton);
    await waitFor(() =>
      expect(axios.post).toHaveBeenCalledTimes(0)
    );
  })

  test('not call API when validation failed', async () => {
    jest.mock('axios');
    axios.post = jest.fn();
    userEvent.type(emailField, 't')
    userEvent.type(passwordField, 'abc')
    userEvent.type(firstNameField, 'J')
    userEvent.type(lastNameField, 'D')
    userEvent.type(dateOfBirth, '2023-03-08')
    userEvent.upload(profilePic, file)
    userEvent.click(registerButton);
    await waitFor(() =>
      expect(axios.post).toHaveBeenCalledTimes(0)
    );
  })
}
)