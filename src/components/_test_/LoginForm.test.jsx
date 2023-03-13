import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import "@testing-library/jest-dom/extend-expect";
import LoginForm from "../loginForm/LoginForm";
import axios from 'axios';

const renderLoginForm = () => (render(<LoginForm />));
test('all field in form fully renders', () => {
    renderLoginForm();
    const emailField = screen.getByTestId("email");
    const passwordField = screen.getByTestId("pass");
    expect(emailField).toBeInTheDocument();
    expect(passwordField).toBeInTheDocument();
});

test.skip('when backend API calls succesful', async () => {  // Login endpoint is not done yet
    jest.mock('axios');
    axios.post = jest.fn();
    renderLoginForm();
    const loginButton = screen.getByText('Login');
    const logSpy = jest.spyOn(global.console,'log')
    const expectedResponse = {
        'success': true,
        'statusCode': '201 Created',
        'message': '',
        'user': { },
    }
    axios.post.mockResolvedValueOnce(expectedResponse);
    fireEvent.click(loginButton);
    await waitFor(() =>
        expect(axios.post).toHaveBeenCalled()
    );
    expect(logSpy).toHaveBeenCalledWith(expectedResponse);
    logSpy.mockRestore();
})

test.skip('when backend API calls unsuccesful', async () => {  // Login endpoint is not done yet
    jest.mock('axios');
    axios.post = jest.fn()
    renderLoginForm();
    const logSpy = jest.spyOn(global.console,'log')
    const loginButton = screen.getByText('Login')
    const expectedError = new Error("Network Error");
    axios.post.mockRejectedValueOnce(expectedError);
    fireEvent.click(loginButton);
    await waitFor(() =>
        expect(axios.post).toHaveBeenCalled()
    );
    expect(logSpy).toHaveBeenCalledWith('Error: ',expectedError);
    logSpy.mockRestore();
})