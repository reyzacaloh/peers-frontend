import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import "@testing-library/jest-dom/extend-expect";
import RegisterTutorForm from './RegisterTutorForm';
import axios, { Axios } from 'axios';
import { act } from 'react-dom/test-utils';


const renderRegisterTutorForm = () => (render(<RegisterTutorForm />));
test('all field in form fully renders', () => {
    renderRegisterTutorForm();
    const emailField = screen.getByTestId("email");
    const nameField = screen.getByTestId("name");
    const npmField = screen.getByTestId("npm");
    const identityField = screen.getByTestId("identity");
    expect(emailField).toBeInTheDocument();
    expect(nameField).toBeInTheDocument();
    expect(npmField).toBeInTheDocument();
    expect(identityField).toBeInTheDocument();
  });

test('when backend API calls succesful', async () => {
    jest.mock('axios');
    axios.post = jest.fn();
    renderRegisterTutorForm();
    const registerButton = screen.getByText('Register');
    const logSpy = jest.spyOn(global.console,'log')
    const expectedResponse = {
        'success': true,
        'statusCode': '201 Created',
        'message': 'User successfully registered!',
        'user': {
          'email': 'test@testmail.com',
          'name': 'testname',
          'npm': '20280605',
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
  renderRegisterTutorForm();
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
