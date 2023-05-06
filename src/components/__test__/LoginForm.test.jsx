import {render, screen, waitFor, act} from '@testing-library/react';
import "@testing-library/jest-dom/extend-expect";
import LoginForm from "../loginForm/LoginForm";
import axios from 'axios';
import {BrowserRouter} from 'react-router-dom'
import AuthContextProvider from "../../contexts/AuthContext";
import userEvent from "@testing-library/user-event";

describe('LoginForm test', () => {
    const renderLoginForm = () => (
        render(<AuthContextProvider> <LoginForm /> </AuthContextProvider>, {wrapper: BrowserRouter})
    );
    let emailField;
    let passwordField;
    let loginButton;

    beforeEach(() => {
        renderLoginForm();
        emailField = screen.getByTestId("email");
        passwordField = screen.getByTestId("pass");
        loginButton = screen.getByText('Login');
    });

    test('all field in form fully renders', () => {
        expect(emailField).toBeInTheDocument();
        expect(passwordField).toBeInTheDocument();
    });

    test('when backend API call is successful', async () => {
        jest.mock('axios');
        axios.post = jest.fn();
        const logSpy = jest.spyOn(global.console,'log');
        const expectedResponse = {
            access: "accesstokentest",
            refresh: "refreshtokentest"
        };
        axios.post.mockResolvedValueOnce(expectedResponse);
        act(() => {
            userEvent.type(emailField, 'test@testmail.com')
            userEvent.type(passwordField, 'testpassword')
            userEvent.click(loginButton);
        });
        await waitFor(() =>
            expect(axios.post).toHaveBeenCalled()
        );
        expect(logSpy).toHaveBeenCalledWith('Success');
        logSpy.mockRestore();
    });

    test('when backend API calls is unsuccessful with network error', async () => {
        jest.mock('axios');
        axios.post = jest.fn();
        const logSpy = jest.spyOn(global.console,'log');
        const expectedError = {
            code: "ERR_NETWORK"
        };
        axios.post.mockRejectedValueOnce(expectedError);
        act(() => {
            userEvent.type(emailField, 'test@testmail.com')
            userEvent.type(passwordField, 'testpassword')
            userEvent.click(loginButton);
        });
        await waitFor(() =>
            expect(axios.post).toHaveBeenCalled()
        );
        expect(logSpy).toHaveBeenCalledWith('Error: ', expectedError);
        logSpy.mockRestore();
    });

    test('when backend API calls is unsuccessful with bad request error', async () => {
        jest.mock('axios');
        axios.post = jest.fn()
        const logSpy = jest.spyOn(global.console,'log')
        const expectedError = {
            code: "ERR_BAD_REQUEST"
        };
        axios.post.mockRejectedValueOnce(expectedError);
        act(() => {
            userEvent.type(emailField, 'test@testmail.com')
            userEvent.type(passwordField, 'testpassword')
            userEvent.click(loginButton);
        });
        await waitFor(() =>
            expect(axios.post).toHaveBeenCalled()
        );
        expect(logSpy).toHaveBeenCalledWith('Error: ', expectedError);
        logSpy.mockRestore();
    });

    test('when backend API calls is unsuccessful with unknown error', async () => {
        jest.mock('axios');
        axios.post = jest.fn()
        const logSpy = jest.spyOn(global.console,'log')
        const expectedError = {
            code: "Test Error"
        };
        axios.post.mockRejectedValueOnce(expectedError);
        act(() => {
            userEvent.type(emailField, 'test@testmail.com')
            userEvent.type(passwordField, 'testpassword')
            userEvent.click(loginButton);
        });
        await waitFor(() =>
            expect(axios.post).toHaveBeenCalled()
        );
        expect(logSpy).toHaveBeenCalledWith('Error: ', expectedError);
        logSpy.mockRestore();
    });

});